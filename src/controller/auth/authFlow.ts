import { appActions } from './../../model/appSlice';
import { take, select, call, put } from 'redux-saga/effects';
import { Auth, authActions } from '../../model/authSlice';
import { RootSelector } from '../../model/createStore';
import { NotificationManager } from 'react-notifications';
import { authService } from '../../lib/authService';
export function* authFlow() {
  while (true) {
    yield take(authActions.loginRequest);
    const auth = yield select<RootSelector<Auth>>((state) => state.auth);
    try {
      const token = yield call(authService.auth, auth);
			yield put(authActions.login({ token }));
			yield put(appActions.lounch())
    } catch (e) {
      if (e.code === 403) {
        NotificationManager.error('Неверные Логин или пароль');
      }
    }
  }
}
