import { fieldServer } from '../../apiWorker/servers/fieldsServer';
import {
  asyncFieldActions,
  fieldsActions,
} from '../../redux/slices/fieldsSlice';
import { call, put, takeEvery } from 'redux-saga/effects';
export function* addValue(
  action: ReturnType<typeof asyncFieldActions.addFieldValueAsync>
) {
  yield put(asyncFieldActions.addFieldValueRequest(action.payload.fieldId));
  const value = yield call(fieldServer.addValue, action.payload);
  const { field, ...v } = value;
  yield put(
    fieldsActions.addValue({
      value: v,
      fieldId: action.payload.fieldId,
    })
  );
}
export function* addValueWatcher() {
  yield takeEvery(asyncFieldActions.addFieldValueAsync, addValue);
}
