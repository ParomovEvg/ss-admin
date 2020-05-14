import { fieldValueService } from '../../apiWorker/servers/fieldValuesService';
import { valuesActions } from '../../redux/slices/fieldValuesSlice';
import { take, call, put, takeEvery } from 'redux-saga/effects';
export function* setValue(
  action: ReturnType<typeof valuesActions.setFieldValueRequest>
) {
  const value = yield call(fieldValueService.setValue, action.payload);
  const { field, ...v } = value;
  yield put(
    valuesActions.setValue({
      ...v,
      fieldId: action.payload.fieldId,
    })
  );
}
export function* setValueWatcher() {
  yield takeEvery(valuesActions.setFieldValueRequest, setValue);
}
