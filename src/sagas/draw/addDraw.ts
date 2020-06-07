import { drawListActions } from './../../redux/slices/draw/drawListSlice';
import { drawIsLoadingActions } from './../../redux/slices/draw/drawIsLoadingSlice';
import { drawServer } from './../../apiWorker/servers/drawSevice';
import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';
import { call, put, takeEvery } from 'redux-saga/effects';
import { parse, formatISO } from 'date-fns';
import {
  DatesAreTaken,
  EndEarlierThanStart,
  DateNotValid,
  FlatDrawDto,
} from '../../apiWorker/typings';

export function* addDraw(action: ReturnType<typeof drawListActions.add>) {
  yield put(drawIsLoadingActions.true());
  try {
    const startDate = parse(
      action.payload.values.start,
      'yyyy-MM-dd',
      new Date()
    );
    const startDateISO = formatISO(startDate);

    const endDate = parse(action.payload.values.end, 'yyyy-MM-dd', new Date());
    const endDateISO = formatISO(endDate);

    const addDrawEither: Either<
      DatesAreTaken | EndEarlierThanStart | DateNotValid,
      FlatDrawDto
    > = yield call(drawServer.addDraw, {
      ...action.payload.values,
      qrLimit: +action.payload.values.qrLimit,
      sLimit: +action.payload.values.sLimit,
      qrLimitPeriodMS: +action.payload.values.qrLimitPeriodMS * 3600 * 1000,
      start: startDateISO,
      end: endDateISO,
    });
    const addDraw = addDrawEither.extract();

    if (addDraw.right) {
      action.payload.action.resetForm();
      yield put(drawListActions.addSuccessful());
      yield put(drawListActions.getAll());
    } else {
      if (addDraw.left.name === 'DateNotValid') {
        NotificationManager.error('Неверный формат даты');
      }
      if (addDraw.left.name === 'EndEarlierThanStart') {
        NotificationManager.error(
          'Дата конца розыгрыша не должна быть раньше даты начала розыгрыша '
        );
        action.payload.action.setErrors({
          end: 'Дата не должны быть раньше начала розыгрыша',
        });
      }
      if (addDraw.left.name === 'DatesAreTaken') {
        const end = addDraw.left.param.endTaken;
        const endError = `до ${(end
          ? new Date(end)
          : new Date()
        ).toLocaleDateString('ru')}`;
        const start = addDraw.left.param.startTaken;
        const startError = `Даты заняты с ${(start
          ? new Date(start)
          : new Date()
        ).toLocaleDateString('ru')}`;

        action.payload.action.setErrors({
          end: endError,
          start: startError,
        });
        NotificationManager.error('Неверные даты начала или конца розыгрыша');
      }
      yield put(drawIsLoadingActions.false());
    }
  } catch (error) {
    yield put(drawIsLoadingActions.false());

    if ((error.response?.status ?? 0) > 499) {
      NotificationManager.error(
        'Неопознанная ошибка сервера, чип и дейл уже в пути'
      );
    }
    console.error(error);
  }
}
export function* addDrawWather() {
  yield takeEvery(drawListActions.add, addDraw);
}
