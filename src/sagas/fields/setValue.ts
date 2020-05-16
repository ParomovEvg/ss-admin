import { fieldServer } from './../../apiWorker/servers/fieldsServer';
import {
  asyncFieldActions,
  fieldsActions,
} from '../../redux/slices/fieldsSlice';
import { take, call, put, takeEvery } from 'redux-saga/effects';
export function* setValue(
  action: ReturnType<typeof asyncFieldActions.setFieldValueRequest>
) {
  const value = yield call(fieldServer.setValue, action.payload);
  const { field, ...v } = value;
  yield put(
    fieldsActions.setValue({
      value: v,
      fieldId: action.payload.fieldId,
    })
  );
}
export function* setValueWatcher() {
  yield takeEvery(asyncFieldActions.setFieldValueRequest, setValue);
}
