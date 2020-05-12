import { screenServer } from './../../lib/screenService';
import { screensActions } from './../../model/screensSlice';
import { appActions } from './../../model/appSlice';
import { take, call, put } from 'redux-saga/effects';
export function* initStore() {
		yield take(appActions.lounch);
		const screens = yield call(screenServer.getScreens)
		yield put(screensActions.getAllScreens({screens}))
		
    try {
    } catch (e) {
  }
}