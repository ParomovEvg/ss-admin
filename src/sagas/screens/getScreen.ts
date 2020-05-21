import { imgFieldsActions } from './../../redux/slices/imgFieldsSlice';
import { store } from './../../redux/createStore';
import { TextFieldsActions } from '../../redux/slices/textFieldsSlice';
import { Either } from 'useful-monads';
import { ScreenDto, ScreenNotFoundById } from '../../apiWorker/typings/index';
import { screenServer } from '../../apiWorker/servers/screenService';
import { call, put, takeEvery, take } from 'redux-saga/effects';
import {
  asyncScreenActions,
  screensActions,
} from '../../redux/slices/screensSlice';
import { NotificationManager } from 'react-notifications';
export function* getScreen(
  action: ReturnType<typeof asyncScreenActions.getScreen>
) {
  const screenList = store.getState().screens.screensList;

  if (!screenList.length) {
    yield put(asyncScreenActions.getScreensRequest());
    yield take(screensActions.getAllScreens);
  }

  try {
    yield put(asyncScreenActions.getScreenRequest(action.payload));
    const screenEither: Either<ScreenNotFoundById, ScreenDto> = yield call(
      screenServer.getScreen,
      action.payload
    );

    const screen = screenEither.extract();
    if (screen.right) {
      yield put(
        imgFieldsActions.getImgFields(
          screen.right.imgFields.map((imgField) => ({
            ...imgField,
            isLoading: false,
          }))
        )
      );
      yield put(screensActions.getActiveScreen(screen.right.id));
      yield put(
        TextFieldsActions.getTextFields(
          screen.right.textFields.map((field) => ({
            ...field,
            isLoading: false,
          }))
        )
      );
    } else {
      NotificationManager.error(screen.left.message);
    }
  } catch (error) {
    yield put(asyncScreenActions.getScreenError(action.payload));
    NotificationManager.error(error);
  }
}

export function* getScreenWatcher() {
  yield takeEvery(asyncScreenActions.getScreen, getScreen);
}
