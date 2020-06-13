import { take, select, call, put } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { authActions } from '../../slices/authSlice';
import { RootSelector } from '../../createStore';
import { authService } from '../../../apiWorker/servers/authService';
import { FlatScreenDto } from '../../../apiWorker/typings';
import { screenServer } from '../../../apiWorker/servers/screenService';
import { screensActions, asyncScreenActions } from '../../slices/screensSlice';
export function* authFlow() {
  while (true) {
    yield take(authActions.loginRequest);
    const password = yield select<RootSelector<string>>(
      (state) => state.auth.password
    );
    const phone = yield select<RootSelector<string>>(
      (state) => state.auth.phone
    );
    try {
      const token = yield call(authService.auth, {
        password,
        phone,
      });
      yield put(authActions.login({ token }));

      const screens: FlatScreenDto[] = yield call(screenServer.getScreens);
      yield put(
        screensActions.getAllScreens({
          screens: screens.map((screen) => ({
            ...screen,
            isLoading: false,
          })),
        })
      );
    } catch (e) {
      yield put(asyncScreenActions.getScreensError());
      if (e.code === 403) {
        NotificationManager.error('Неверные Логин или пароль');
      } else {
        NotificationManager.error(e);
      }
    }
  }
}
