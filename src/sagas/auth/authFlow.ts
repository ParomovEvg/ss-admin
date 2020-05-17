import { screenServer } from '../../apiWorker/servers/screenService';
import { take, select, call, put } from 'redux-saga/effects';
import { Auth, authActions } from '../../redux/slices/authSlice';
import { RootSelector } from '../../redux/createStore';
import { NotificationManager } from 'react-notifications';
import { authService } from '../../apiWorker/servers/authService';
import { screensActions } from '../../redux/slices/screensSlice';
import { FlatScreenDto } from '../../apiWorker/typings';
export function* authFlow() {
  while (true) {
    yield take(authActions.loginRequest);
    const auth = yield select<RootSelector<Auth>>((state) => state.auth);
    try {
      const token = yield call(authService.auth, auth);
      yield put(authActions.login({ token }));
      const screens: FlatScreenDto[] = yield call(screenServer.getScreens);
      yield put(
        screensActions.getAllScreens({
          screens: screens.map((screen) => ({
            ...screen,
            status: 'done',
          })),
        })
      );
    } catch (e) {
      if (e.code === 403) {
        NotificationManager.error('Неверные Логин или пароль');
      }
    }
  }
}
