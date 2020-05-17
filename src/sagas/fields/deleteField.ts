import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';
import { fieldServer } from './../../apiWorker/servers/fieldsServer';
import {
  asyncFieldActions,
  DeleteFieldType,
  fieldsActions,
} from './../../redux/slices/fieldsSlice';
import { call, put, takeEvery } from 'redux-saga/effects';
import { TextFieldNotFoundById } from '../../apiWorker/typings';

export function* deleteField(
  action: ReturnType<typeof asyncFieldActions.deleteFieldAsync>
) {
  yield put(asyncFieldActions.deleteFieldRequest(action.payload));
  try {
    const fieldDeleteIdEither: Either<
      TextFieldNotFoundById,
      DeleteFieldType
    > = yield call(fieldServer.deleteField, action.payload);

    const fieldDeleteId = fieldDeleteIdEither.extract();
    if (fieldDeleteId.right) {
      yield put(fieldsActions.deleteField(fieldDeleteId.right?.id ?? 0));
    } else {
      yield put(asyncFieldActions.deleteFieldError(action.payload));
      NotificationManager.error(fieldDeleteId.left.message);
    }
  } catch (error) {
    yield put(asyncFieldActions.deleteFieldError(action.payload));
    if (error.response.status > 499) {
      NotificationManager.error(
        'Неопознанная ошибка сервера, чип и дейл уже в пути'
      );
    }
    console.error(error);
  }
}
export function* deleteFieldWatcher() {
  yield takeEvery(asyncFieldActions.deleteFieldAsync, deleteField);
}
