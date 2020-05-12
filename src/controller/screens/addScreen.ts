import { FlatScreenDto } from './../../lib/typings/index';
import { screenServer } from './../../lib/screenService';
import { screensActions } from './../../model/screensSlice';
import { take, call, put } from 'redux-saga/effects';
export function* addScreen() {
		
		yield take(screensActions.addScreenRequest);
		const screen: FlatScreenDto = yield call(screenServer.addScreen)
		yield put(screensActions.addScreen({ screen }))
    try {
    } catch (e) {
  }
}