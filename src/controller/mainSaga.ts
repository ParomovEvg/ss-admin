import { all } from 'redux-saga/effects';
import { counterListener } from './counter/counter-listener';
import { authFlow } from './auth/authFlow';
import { watchAuthToken } from './auth/authToken';
export function* mainSaga() {
  console.log('hello1');
  yield all([counterListener(), authFlow(), watchAuthToken()]);
}
