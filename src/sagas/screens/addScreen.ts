import { asyncScreenActions } from './../../redux/slices/screensSlice';
import { FlatScreenDto } from '../../apiWorker/typings/index';
import { screenServer } from '../../apiWorker/servers/screenService';
import { screensActions } from '../../redux/slices/screensSlice';
import { take, call, put } from 'redux-saga/effects';
export function* addScreen() {
  yield take(asyncScreenActions.addScreenRequest);
  // const screen: FlatScreenDto = yield call(screenServer.addScreen);
  // yield put(screensActions.addScreen({ screen }));
  try {
  } catch (e) {}
}
