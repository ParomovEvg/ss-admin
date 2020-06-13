import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';

import { call, put, takeEvery } from 'redux-saga/effects';
import {
  asyncTextFieldActions,
  DeleteFieldType,
  TextFieldsActions,
} from '../../slices/textFieldsSlice';
import { TextFieldNotFoundById } from '../../../apiWorker/typings';
import { TextFieldServer } from '../../../apiWorker/servers/TextFieldsServer';

export function* deleteTextField(
  action: ReturnType<typeof asyncTextFieldActions.deleteTextFieldAsync>
) {
  yield put(asyncTextFieldActions.deleteTextFieldRequest(action.payload));
  try {
    const fieldDeleteIdEither: Either<
      TextFieldNotFoundById,
      DeleteFieldType
    > = yield call(TextFieldServer.deleteTextField, action.payload);

    const fieldDeleteId = fieldDeleteIdEither.extract();
    if (fieldDeleteId.right) {
      yield put(
        TextFieldsActions.deleteTextField(fieldDeleteId.right?.id ?? 0)
      );
    } else {
      yield put(asyncTextFieldActions.deleteTextFieldError(action.payload));
      NotificationManager.error(fieldDeleteId.left.message);
    }
  } catch (error) {
    yield put(asyncTextFieldActions.deleteTextFieldError(action.payload));
    if (error.response.status > 499) {
      NotificationManager.error(
        'Неопознанная ошибка сервера, чип и дейл уже в пути'
      );
    }
    console.error(error);
  }
}
export function* deleteTextFieldWatcher() {
  yield takeEvery(asyncTextFieldActions.deleteTextFieldAsync, deleteTextField);
}
