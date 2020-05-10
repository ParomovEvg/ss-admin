import { loginService } from './../../lib/loginService';
import { Auth, authActions } from './../../model/authSlice';
import { RootSelector } from './../../model/createStore';
import { take, select, call, put, takeEvery } from 'redux-saga/effects';

export function* authCheck(action: any) {
  const {
    payload: { F, args },
  } = action;
  try {
    yield put(authActions.logout({}));
    const response = yield call(F, ...args);
  } catch (e) {
    if (e.response.status === 401) {
      const auth = yield select<RootSelector<Auth>>((state) => state.auth);
      const token = yield call(loginService.auth, auth);
      yield put(authActions.login({ token }));
      const response = yield call(F, ...args);
    }
  }
}

export function* watchAuthToken() {
  yield takeEvery('auth/authCheck', authCheck);
}
