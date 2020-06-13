import { drawNowSelector } from './../../slices/draw/drawSelectors';
import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { drawListActions, drawType } from '../../slices/draw/drawListSlice';
import { DrawNotFoundById } from '../../../apiWorker/typings';
import { drawServer } from '../../../apiWorker/servers/drawSevice';
import { drawNowActions } from '../../slices/draw/drawNow';

export function* deleteDraw(action: ReturnType<typeof drawListActions.delete>) {
  yield put(drawListActions.isLoadingDraw(action.payload));
  try {
    const deleteDrawEither: Either<
      DrawNotFoundById,
      { id?: number }
    > = yield call(drawServer.deleteDraw, action.payload);
    const deleteDraw = deleteDrawEither.extract();

    const nowDraw: drawType = yield select(drawNowSelector);

    if (nowDraw.id === action.payload) {
      yield put(drawNowActions.delete());
    }

    if (deleteDraw.right) {
      yield put(drawListActions.isNoLoadingDraw(action.payload));
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
