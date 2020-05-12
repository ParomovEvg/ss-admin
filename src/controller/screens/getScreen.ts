import { ScreenDto } from './../../lib/typings/index';
import { screenServer } from './../../lib/screenService';
import { screensActions } from './../../model/screensSlice';
import { take, call, put, takeEvery } from 'redux-saga/effects';
export function* getScreen(action: ReturnType<typeof screensActions.getScreenRequest> ) {
	const screen: ScreenDto = yield call(screenServer.getScreen, action.payload)
		
		console.log(screen)
		yield put(screensActions.getScreen({ screen }))
    try {
    } catch (e) {
  }
}
export function* getScreenWatcher() {
	yield takeEvery(screensActions.getScreenRequest, getScreen)
}

const q = screensActions.getScreenRequest