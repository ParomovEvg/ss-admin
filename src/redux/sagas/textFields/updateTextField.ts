import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import {
  asyncTextFieldActions,
  TextFieldsActions,
} from '../../slices/textFieldsSlice';

export function* updateTextField(
  action: ReturnType<typeof asyncTextFieldActions.updateTextField_async>
) {
  // const { values, action: formikActions } = action.payload;
  // const id = yield select(updateImgFieldidSelector);
  // yield put(TextFieldsActions.isLoadingField(id));
  // try {
  //   if (updateImgField.right) {
  //   } else {
  //     yield put(TextFieldsActions.isNoLoadingField(id));
  //     NotificationManager.error(updateImgField.left.message);
  //   }
  // } catch (error) {
  //   yield put(TextFieldsActions.isNoLoadingField(id));
  //   if (error.response?.status ?? 0 > 499) {
  //     NotificationManager.error(
  //       'Неопознанная ошибка сервера, чип и дейл уже в пути'
  //     );
  //   }
  //   console.error(error);
  // }
}
export function* updateTextFieldWatcher() {
  yield takeEvery(asyncTextFieldActions.updateTextField_async, updateTextField);
}
