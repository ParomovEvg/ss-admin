import { Either } from 'useful-monads';
import { RootState, RootSelector } from '../../redux/createStore';
import { TextFieldServer } from '../../apiWorker/servers/TextFieldsServer';
import {
  asyncTextFieldActions,
  TextFieldsActions,
} from '../../redux/slices/textFieldsSlice';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import {
  ScreenNotFoundById,
  TextFieldAlreadyExists,
  FlatTextFieldDto,
  TextDto,
} from '../../apiWorker/typings';
import { NotificationManager } from 'react-notifications';
export function* addTextField(
  action: ReturnType<typeof asyncTextFieldActions.addTextFieldAsync>
) {
  yield put(asyncTextFieldActions.addTextFieldRequest(action.payload));

  const name = yield select<RootSelector<string>>(
    (state) => state.TextFields.addTextfieldName
  );
  const TextFieldValue = yield select<RootSelector<string>>(
    (state) => state.TextFields.addTextFieldValue
  );
  try {
    const textFieldEither: Either<
      ScreenNotFoundById | TextFieldAlreadyExists,
      FlatTextFieldDto
    > = yield call(TextFieldServer.addTextField, {
      name,
      screenId: action.payload,
    });
    const field = textFieldEither.extract();

    if (field.right) {
      const value: TextDto = yield call(TextFieldServer.addTextValue, {
        text: TextFieldValue,
        fieldId: field.right.id,
      });

      yield put(
        TextFieldsActions.addTextField({
          item: {
            ...field.right,
            values: [value],
            isLoading: false,
          },
          id: action.payload,
        })
      );

      yield put(
        TextFieldsActions.addTextValue({
          value,
          fieldId: field.right.id,
        })
      );
    } else {
      yield put(asyncTextFieldActions.addTextFieldError(action.payload));
      NotificationManager.error(field.left.message);
    }
  } catch (error) {
    yield put(asyncTextFieldActions.addTextFieldError(action.payload));
    NotificationManager.error('Упс, кто-то сломался, но жить будем');
  }
}
export function* addTextFieldWatcher() {
  yield takeEvery(asyncTextFieldActions.addTextFieldAsync, addTextField);
}
