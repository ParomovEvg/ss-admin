import { drawNowActions } from './../../redux/slices/draw/drawNow';
import { drawServer } from './../../apiWorker/servers/drawSevice';
import { drawIsLoadingActions } from './../../redux/slices/draw/drawIsLoadingSlice';
import { call, put, takeEvery } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { FlatDrawDto, NotDrawNow } from '../../apiWorker/typings';
import { Either } from 'useful-monads';

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
      NotificationManager.error(drawNow.left.message);
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
