import { drawIsLoadingActions } from './../../redux/slices/draw/drawIsLoadingSlice';
import { drawServer } from '../../apiWorker/servers/drawSevice';
import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FlatDrawDto,
  DatesAreTaken,
  EndEarlierThanStart,
  DateNotValid,
} from '../../apiWorker/typings';
import { nextDrawActions } from '../../redux/slices/draw/nextDrawSlice';
import { parse, formatISO } from 'date-fns';
import { drawListActions } from '../../redux/slices/draw/drawListSlice';

export function* nextDraw(action: ReturnType<typeof nextDrawActions.nextDraw>) {
  const { qrLimit, sLimit, qrLimitPeriodMS } = action.payload.values;

  const endDate = parse(action.payload.values.end, 'yyyy-MM-dd', new Date());
  const endDateISO = formatISO(endDate);

  yield put(drawIsLoadingActions.true());

  try {
    const nextDrawEither: Either<
      DatesAreTaken | EndEarlierThanStart | DateNotValid,
      FlatDrawDto
    > = yield call(drawServer.createNextDraw, {
      description: action.payload.values.description,
      end: endDateISO,
      qrLimit: +qrLimit,
      sLimit: +sLimit,
      qrLimitPeriodMS: +qrLimitPeriodMS * 3600 * 1000,
    });

    const nextDraw = nextDrawEither.extract();
    if (nextDraw.right) {
      yield put(nextDrawActions.nextDraw_successful());
      action.payload.action.resetForm();
      yield put(drawListActions.getAll());
    } else {
      yield put(drawIsLoadingActions.false());
      NotificationManager.error(nextDraw.left.message);
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
export function* nextDrawWather() {
  yield takeEvery(nextDrawActions.nextDraw, nextDraw);
}
