import { qrListActions } from './../../slices/qr/qrList.slice';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';

import { qrFilterActions } from '../../slices/qr/filterQrsSlice';
import { qrLoadingActions } from '../../slices/qr/qrIsLoadingSlice.constructor';
import { qrServer } from '../../../apiWorker/servers/qrServer';
import {
  qrFilterDrawIdSelector,
  qrFilterCheckoutIdSelector,
  qrFilterPhoneSelector,
} from '../../slices/qr/qrSelectors';
import { FlatAllQrDto } from '../../../apiWorker/typings';

export function* filterQr(action: ReturnType<typeof qrFilterActions.filterQr>) {
  yield put(qrLoadingActions.true());
  try {
    const { fdFind: qrFilterFd, fpFind: qrFilterFp } = action.payload.values;
    const { resetForm } = action.payload.formikActions;
    const qrFilterDrawId = yield select(qrFilterDrawIdSelector);
    const qrFilterCheckoutId: string = yield select(qrFilterCheckoutIdSelector);
    const qrFilterPhone = yield select(qrFilterPhoneSelector);
    const qrList: FlatAllQrDto[] = yield call(qrServer.qrFilter, {
      checkoutId: parseInt(qrFilterCheckoutId),
      drawId: parseInt(qrFilterDrawId),
      phone: qrFilterPhone,
      fd: qrFilterFd,
      fp: qrFilterFp,
    });
    yield put(qrListActions.getAllSuccessful(qrList));
    yield put(qrLoadingActions.false());
  } catch (error) {
    yield put(qrLoadingActions.false());
    NotificationManager.error('Упс, кто-то сломался, но жить будем');
    console.error(error);
  }
}

export function* filterQrWatcher() {
  yield takeEvery(qrFilterActions.filterQr, filterQr);
}
