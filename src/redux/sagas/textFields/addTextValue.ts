import { call, put, takeEvery } from 'redux-saga/effects';
import {
  asyncTextFieldActions,
  TextFieldsActions,
} from '../../slices/textFieldsSlice';
import { TextFieldServer } from '../../../apiWorker/servers/TextFieldsServer';
export function* addTextValue(
  action: ReturnType<typeof asyncTextFieldActions.addTextFieldValueAsync>
) {
  yield put(
    asyncTextFieldActions.addTextFieldValueRequest(action.payload.fieldId)
  );
  const value = yield call(TextFieldServer.addTextValue, action.payload);
  const { field, ...v } = value;
  yield put(
    TextFieldsActions.addTextValue({
      value: v,
      fieldId: action.payload.fieldId,
    })
  );
}
export function* addValueWatcher() {
  yield takeEvery(asyncTextFieldActions.addTextFieldValueAsync, addTextValue);
}
