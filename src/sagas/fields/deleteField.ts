import { NotificationManager } from 'react-notifications';
import { Either } from '@sweet-monads/either';
import { fieldServer } from './../../apiWorker/servers/fieldsServer';
import {
  asyncFieldActions,
  deleteFieldType,
  fieldsActions,
} from './../../redux/slices/fieldsSlice';
import { take, call, put, takeEvery } from 'redux-saga/effects';
import { TextFieldNotFoundById } from '../../apiWorker/typings';

export function* deleteField(
  action: ReturnType<typeof asyncFieldActions.deleteFieldAsync>
) {
  let deleteFiledId: number = 0;

  yield put(asyncFieldActions.deleteFieldRequest(action.payload));

  const fieldDeleteId: Either<
    TextFieldNotFoundById,
    deleteFieldType
  > = yield call(fieldServer.deleteField, action.payload);
  fieldDeleteId
    .map((r) => {
      deleteFiledId = r?.id ?? 0;
    })
    .mapLeft((e) => {
      NotificationManager.error(e.message);
    });
  yield put(fieldsActions.deleteField(deleteFiledId));
}
export function* deleteFieldWatcher() {
  yield takeEvery(asyncFieldActions.deleteFieldAsync, deleteField);
}
