import { store } from './../../redux/createStore';
import { fieldsActions, fieldType } from '../../redux/slices/fieldsSlice';
// import { valuesActions, valueType } from '../../redux/slices/fieldValuesSlice';
import { NotificationManager } from 'react-notifications';
import { Either } from '@sweet-monads/either';
import { ScreenDto, ScreenNotFoundById } from '../../apiWorker/typings/index';
import { screenServer } from '../../apiWorker/servers/screenService';
import { call, put, takeEvery, take, all, fork } from 'redux-saga/effects';
import {
  asyncScreenActions,
  screensActions,
} from '../../redux/slices/screensSlice';
export function* getScreen(
  action: ReturnType<typeof asyncScreenActions.getScreen>
) {
  const screenList = store.getState().screens.screensList;
  if (!screenList.length) yield take(screensActions.getAllScreens);
  yield put(asyncScreenActions.getScreenRequest(action.payload));

  let fields: fieldType[] = [];
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
          ...field,
          status: 'none',
        };
      });
    })
    .mapLeft((e) => {
      NotificationManager.error(e.message);
    });

  yield put(screensActions.getActiveScreen(id));
  // yield put(valuesActions.getValues(values));
  yield put(fieldsActions.getFields(fields));
}

export function* getScreenWatcher() {
  yield takeEvery(asyncScreenActions.getScreen, getScreen);
}
