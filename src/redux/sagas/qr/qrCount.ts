import { take, call, put } from 'redux-saga/effects';

import { qrPaginationActions } from '../../slices/qr/qrPagination.slice';
import { qrServer } from '../../../apiWorker/servers/qrServer';

export const getPages = (count: number) => Math.ceil(count / 5);

export function* qrCountWatcher() {
  while (true) {
    yield take(qrPaginationActions.getqrCount);

    const count = yield call(qrServer.qrCount);

    const pages = getPages(parseInt(count));

    yield put(qrPaginationActions.setCount(pages));
  }
}
