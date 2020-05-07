import { take, select, call, put } from 'redux-saga/effects';
import { Auth, authActions } from '../../model/authSlice';
import { RootSelector } from '../../model/createStore';
import { NotificationManager } from 'react-notifications';
import { loginService } from '../../lib/loginService';
export function* authFlow() {
  while (true) {
    yield take(authActions.loginRequest);
    const auth = yield select<RootSelector<Auth>>((state) => state.auth);
    try {
      const token = yield call(loginService.auth, auth);
      yield put(authActions.login({ token }));
    } catch (e) {
      if (e.code === 403) {
        NotificationManager.error('Неверные Логин или пароль');
      }
    }
  }
}
