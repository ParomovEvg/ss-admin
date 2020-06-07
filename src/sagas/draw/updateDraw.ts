import { drawServer } from '../../apiWorker/servers/drawSevice';
import { drawListActions } from '../../redux/slices/draw/drawListSlice';
import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { DrawNotFoundById, FlatDrawDto } from '../../apiWorker/typings';
import { updateDrawIdSelector } from '../../redux/slices/draw/drawSelectors';

export function* updateDraw(action: ReturnType<typeof drawListActions.update>) {
  const id = yield select(updateDrawIdSelector);
  const { qrLimit, sLimit, qrLimitPeriodMS } = action.payload.values;
  yield put(drawListActions.isLoadingDraw(id));

  try {
    const updateDrawEither: Either<DrawNotFoundById, FlatDrawDto> = yield call(
      drawServer.updateDraw,
      {
        qrLimit: +qrLimit,
        sLimit: +sLimit,
        qrLimitPeriodMS: +qrLimitPeriodMS * 3600 * 1000,
      },
      id
    );
    const updateDraw = updateDrawEither.extract();
    if (updateDraw.right) {
      yield put(drawListActions.updateSuccessful());
      action.payload.action.resetForm();
      yield put(drawListActions.getAll());
      yield put(drawListActions.isNoLoadingDraw(id));
    } else {
      yield put(drawListActions.isNoLoadingDraw(id));
      NotificationManager.error(updateDraw.left.message);
    }
  } catch (error) {
    yield put(drawListActions.isNoLoadingDraw(id));

    if ((error.response?.status ?? 0) > 499) {
      NotificationManager.error(
        'Неопознанная ошибка сервера, чип и дейл уже в пути'
      );
    }
    console.error(error);
  }
}
export function* updateDrawWather() {
  yield takeEvery(drawListActions.update, updateDraw);
}
