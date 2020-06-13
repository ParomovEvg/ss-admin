import { call, put, takeEvery } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';
import { drawIsLoadingActions } from '../../slices/draw/drawIsLoadingSlice';
import { NotDrawNow, FlatDrawDto } from '../../../apiWorker/typings';
import { drawServer } from '../../../apiWorker/servers/drawSevice';
import { drawNowActions } from '../../slices/draw/drawNow';

export function* getNowDraw() {
  yield put(drawIsLoadingActions.true());
  try {
    const drawNowEither: Either<NotDrawNow, FlatDrawDto> = yield call(
      drawServer.getNowDraw
    );

    const drawNow = drawNowEither.extract();

    if (drawNow.right) {
      yield put(drawNowActions.getSuccessful(drawNow.right));
      yield put(drawIsLoadingActions.false());
    } else {
      NotificationManager.error('текущий розыгрыш не найден');
      yield put(drawIsLoadingActions.false());
    }
  } catch (error) {
    yield put(drawIsLoadingActions.false());
    NotificationManager.error('Упс, кто-то сломался, но жить будем');
  }
}

export function* getNowDrawWatcher() {
  yield takeEvery(drawNowActions.get, getNowDraw);
}
