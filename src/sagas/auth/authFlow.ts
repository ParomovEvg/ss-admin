import { screenServer } from '../../apiWorker/servers/screenService';
import { take, select, call, put } from 'redux-saga/effects';
import { Auth, authActions } from '../../redux/slices/authSlice';
import { RootSelector } from '../../redux/createStore';
import { authService } from '../../apiWorker/servers/authService';
import {
  screensActions,
  asyncScreenActions,
} from '../../redux/slices/screensSlice';
import { FlatScreenDto } from '../../apiWorker/typings';
import { NotificationManager } from 'react-notifications';
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
