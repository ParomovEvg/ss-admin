import { call, put, takeEvery } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { drawIsLoadingActions } from '../../slices/draw/drawIsLoadingSlice';
import { FlatDrawDto } from '../../../apiWorker/typings';
import { drawServer } from '../../../apiWorker/servers/drawSevice';
import { drawListActions } from '../../slices/draw/drawListSlice';

export function* getAllDraw() {
  yield put(drawIsLoadingActions.true());
  try {
    const draws: FlatDrawDto[] = yield call(drawServer.getAllDraw);
    yield put(drawListActions.getAllSuccessful(draws));
    // if()
    yield put(drawIsLoadingActions.false());
  } catch (error) {
    yield put(drawIsLoadingActions.false());
    NotificationManager.error('Упс, кто-то сломался, но жить будем');
  }
}

export function* getAllDrawWatcher() {
  yield takeEvery(drawListActions.getAll, getAllDraw);
}
