import { call, put, takeEvery } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { asyncScreenActions, screensActions } from '../../slices/screensSlice';
import { screenServer } from '../../../apiWorker/servers/screenService';
import { FlatScreenDto } from '../../../apiWorker/typings';
export function* deleteScreen(
  action: ReturnType<typeof asyncScreenActions.deleteScreen_async>
) {
  yield put(asyncScreenActions.deleteScreen_request(action.payload));

  try {
    const screenEither = yield call(screenServer.deleteScreen, action.payload);

    const screen = screenEither.extract();
    if (screen.right) {
      const screens: FlatScreenDto[] = yield call(screenServer.getScreens);
      yield put(
        screensActions.getAllScreens({
          screens: screens.map((screen) => ({
            ...screen,
            isLoading: false,
          })),
        })
      );
    } else {
      NotificationManager.error(screen.left.message);
      yield put(asyncScreenActions.deleteScreen_error(action.payload));
    }
  } catch (error) {
    yield put(asyncScreenActions.deleteScreen_error(action.payload));
    NotificationManager.error(
      'Что-то пошло не так, но мы обящательно разберемся'
    );
  }
}

export function* deleteScreenWatcher() {
  yield takeEvery(asyncScreenActions.deleteScreen_async, deleteScreen);
}
