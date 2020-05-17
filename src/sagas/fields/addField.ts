import { Either } from 'useful-monads';
import { RootState, RootSelector } from './../../redux/createStore';
import { fieldServer } from './../../apiWorker/servers/fieldsServer';
import {
  asyncFieldActions,
  fieldsActions,
} from '../../redux/slices/fieldsSlice';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import {
  ScreenNotFoundById,
  TextFieldAlreadyExists,
  FlatTextFieldDto,
  TextDto,
} from '../../apiWorker/typings';
import { NotificationManager } from 'react-notifications';
export function* addField(
  action: ReturnType<typeof asyncFieldActions.addFieldAsync>
) {
  yield put(asyncFieldActions.addFieldRequest());

  const name = yield select<RootSelector<string>>(
    (state) => state.fields.addfieldName
  );
  const fieldValue = yield select<RootSelector<string>>(
    (state) => state.fields.addFieldValue
  );

  const fieldEither: Either<
    ScreenNotFoundById | TextFieldAlreadyExists,
    FlatTextFieldDto
  > = yield call(fieldServer.addField, {
    name,
    screenId: action.payload.screenId,
  });
  const field = fieldEither.extract();

  if (field.right) {
    const value: TextDto = yield call(fieldServer.addValue, {
      text: fieldValue,
      fieldId: field.right.id,
    });

    yield put(
      fieldsActions.addField({
        ...field.right,
        values: [value],
      })
    );

    yield put(
      fieldsActions.addValue({
        value,
        fieldId: field.right.id,
      })
    );
  } else {
    yield put(asyncFieldActions.addFieldError(action.payload.screenId));
    NotificationManager.error(field.left.message);
  }
}
export function* addFieldWatcher() {
  yield takeEvery(asyncFieldActions.addFieldAsync, addField);
}
