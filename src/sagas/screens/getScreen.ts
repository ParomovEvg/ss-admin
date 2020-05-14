import { fieldsActions, fieldType } from '../../redux/slices/fieldsSlice';
import { valuesActions, valueType } from '../../redux/slices/fieldValuesSlice';
import { NotificationManager } from 'react-notifications';
import { Either } from '@sweet-monads/either';
import { ScreenDto, ScreenNotFoundById } from '../../apiWorker/typings/index';
import { screenServer } from '../../apiWorker/servers/screenService';
import { call, put, takeEvery } from 'redux-saga/effects';
import { screensActions } from '../../redux/slices/screensSlice';
export function* getScreen(
  action: ReturnType<typeof screensActions.getScreenRequest>
) {
  let fields: fieldType[] = [];
  let values: valueType[] = [];
  let id: number = 0;

  const screen: Either<ScreenNotFoundById, ScreenDto> = yield call(
    screenServer.getScreen,
    action.payload
  );
  screen
    .map((r) => {
      id = r.id;

      fields = r.textFields.map((field) => {
        return {
          id: field.id,
          name: field.name,
          status: 'none',
        };
      });

      values = r.textFields
        .map((field) => {
          return field.values.map((value) => {
            return {
              ...value,
              fieldId: field.id,
            };
          });
        })
        .flat();
    })
    .mapLeft((e) => {
      NotificationManager.error(e.message);
    });

  yield put(screensActions.getActiveScreen(id));
  yield put(valuesActions.getValues(values));
  yield put(fieldsActions.getFields(fields));
}

export function* getScreenWatcher() {
  yield takeEvery(screensActions.getScreenRequest, getScreen);
}
