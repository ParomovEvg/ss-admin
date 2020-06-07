import { drawServer } from './../../apiWorker/servers/drawSevice';
import { drawListActions } from '../../redux/slices/draw/drawListSlice';
import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';
import { call, put, takeEvery } from 'redux-saga/effects';
import { DrawNotFoundById } from '../../apiWorker/typings';

export function* deleteDraw(action: ReturnType<typeof drawListActions.delete>) {
  yield put(drawListActions.isLoadingDraw(action.payload));
  try {
    const deleteDrawEither: Either<
      DrawNotFoundById,
      { id?: number }
    > = yield call(drawServer.deleteDraw, action.payload);
    const deleteDraw = deleteDrawEither.extract();

    if (deleteDraw.right) {
      yield put(drawListActions.getAll());
    } else {
      yield put(drawListActions.isNoLoadingDraw(action.payload));
      NotificationManager.error(deleteDraw.left.message);
    }
  } catch (error) {
    yield put(drawListActions.isNoLoadingDraw(action.payload));

    if ((error.response?.status ?? 0) > 499) {
      NotificationManager.error(
        'Неопознанная ошибка сервера, чип и дейл уже в пути'
      );
    }
    console.error(error);
  }
}
export function* deleteDrawWather() {
  yield takeEvery(drawListActions.delete, deleteDraw);
}
