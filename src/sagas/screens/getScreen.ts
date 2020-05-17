import { store } from './../../redux/createStore';
import { fieldsActions, FieldType } from '../../redux/slices/fieldsSlice';
import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';
import { ScreenDto, ScreenNotFoundById } from '../../apiWorker/typings/index';
import { screenServer } from '../../apiWorker/servers/screenService';
import { call, put, takeEvery, take } from 'redux-saga/effects';
import {
  asyncScreenActions,
  screensActions,
} from '../../redux/slices/screensSlice';
export function* getScreen(
  action: ReturnType<typeof asyncScreenActions.getScreen>
) {
  const screenList = store.getState().screens.screensList;
  if (!screenList.length) yield take(screensActions.getAllScreens);

  yield put(asyncScreenActions.getScreenRequest(action.payload));
  const screenEither: Either<ScreenNotFoundById, ScreenDto> = yield call(
    screenServer.getScreen,
    action.payload
  );

  const screen = screenEither.extract();
  if (screen.right) {
    yield put(screensActions.getActiveScreen(screen.right.id));
    yield put(
      fieldsActions.getFields(
        screen.right.textFields.map((field) => ({
          ...field,
          status: 'none',
        }))
      )
    );
  } else {
    NotificationManager.error(screen.left.message);
  }
}

export function* getScreenWatcher() {
  yield takeEvery(asyncScreenActions.getScreen, getScreen);
}
