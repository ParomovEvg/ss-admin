import { Either } from 'useful-monads';
import { call, put, takeEvery, take } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { asyncScreenActions, screensActions } from '../../slices/screensSlice';
import { store } from '../../createStore';
import { ScreenNotFoundById, ScreenDto } from '../../../apiWorker/typings';
import { screenServer } from '../../../apiWorker/servers/screenService';
import { imgFieldsActions } from '../../slices/imgFieldsSlice';
import { markdownActions } from '../../slices/markdownFieldSlice';
import { TextFieldsActions } from '../../slices/textFieldsSlice';

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
      yield put(
        markdownActions.getAllMarkdowm(
          screen.right.mdFields.map((markdown) => ({
            ...markdown,
            isLoading: false,
            addValueText: undefined,
          }))
        )
      );
      yield put(
        TextFieldsActions.getTextFields(
          screen.right.textFields.map((textfield) => ({
            ...textfield,
            isLoading: false,
          }))
        )
      );
      yield put(screensActions.getActiveScreen(screen.right.id));
    } else {
      NotificationManager.error(screen.left.message);
      yield put(asyncScreenActions.getScreenError(action.payload));
    }
  } catch (error) {
    yield put(asyncScreenActions.getScreenError(action.payload));
    NotificationManager.error(
      'Что-то пошло не так, но мы обящательно разберемся'
    );
  }
}

export function* getScreenWatcher() {
  yield takeEvery(asyncScreenActions.getScreen, getScreen);
}
