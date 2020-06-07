import { drawServer } from './../../apiWorker/servers/drawSevice';
import { drawIsLoadingActions } from './../../redux/slices/draw/drawIsLoadingSlice';
import { drawListActions } from './../../redux/slices/draw/drawListSlice';
import { call, put, takeEvery } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { FlatDrawDto } from '../../apiWorker/typings';
import { drawNowActions } from '../../redux/slices/draw/drawNow';

export function* getAllDraw() {
  yield put(drawIsLoadingActions.true());
  try {
    const draws: FlatDrawDto[] = yield call(drawServer.getAllDraw);
    yield put(drawListActions.getAllSuccessful(draws));
    yield put(drawNowActions.get());
  } catch (error) {
    yield put(drawIsLoadingActions.false());
    NotificationManager.error('Упс, кто-то сломался, но жить будем');
  }
}

export function* getAllDrawWatcher() {
  yield takeEvery(drawListActions.getAll, getAllDraw);
}
