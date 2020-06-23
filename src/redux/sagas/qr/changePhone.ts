import { call, put, takeEvery } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';

import { GetPhoneDto } from './../../../apiWorker/typings/index';
import { authActions } from './../../slices/authSlice';
import { qrFilterActions } from '../../slices/qr/filterQrsSlice';
import { qrServer } from '../../../apiWorker/servers/qrServer';

export function* changePhone(
  action: ReturnType<typeof qrFilterActions.phoneHandler>
) {
  try {
    const phones: GetPhoneDto[] = yield call(
      qrServer.changePhone,
      action.payload
    );
    yield put(authActions.getPhones(phones));
  } catch (error) {
    NotificationManager.error('Упс, кто-то сломался, но жить будем');
  }
}

export function* changePhoneWatcher() {
  yield takeEvery(qrFilterActions.phoneHandler, changePhone);
}
