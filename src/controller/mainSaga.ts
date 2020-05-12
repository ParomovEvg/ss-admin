import { all } from 'redux-saga/effects';
import { counterListener } from './counter/counter-listener';
import { authFlow } from './auth/authFlow';
import { initStore } from './initStore/initStore';
import { addScreen } from './screens/addScreen';
import { getScreenWatcher } from './screens/getScreen';
export function* mainSaga() {
  // console.log('hello1');
  yield all([counterListener(), authFlow(), initStore(), addScreen(), getScreenWatcher()]);
}
