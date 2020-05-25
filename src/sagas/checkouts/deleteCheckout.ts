import { CheckoutsServer } from './../../apiWorker/servers/checkoutsServer';
import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  checkoutAsymcActions,
  checkoutActions,
} from '../../redux/slices/checkoutSlice';
import { CheckoutNotFoundById } from '../../apiWorker/typings';

export function* deleteCheckout(
  action: ReturnType<typeof checkoutAsymcActions.checkoutDelete_async>
) {
  yield put(checkoutAsymcActions.checkoutDelete_request(action.payload));
  try {
    const deleteIdEither: Either<
      CheckoutNotFoundById,
      {
        checkoutId: number;
      }
    > = yield call(CheckoutsServer.deleteCheckout, action.payload);

    const deleteId = deleteIdEither.extract();

    if (deleteId.right) {
      yield put(checkoutActions.deleteCheckout(deleteId.right.checkoutId));
    } else {
      yield put(checkoutAsymcActions.checkoutDelete_error(action.payload));
      NotificationManager.error(deleteId.left.message);
    }
  } catch (error) {
    yield put(checkoutAsymcActions.checkoutDelete_error(action.payload));
    if (error.response?.status ?? 0 > 499) {
      NotificationManager.error(
        'Неопознанная ошибка сервера, чип и дейл уже в пути'
      );
    }
    console.error(error);
  }
}
export function* deleteCheckoutWatcher() {
  yield takeEvery(checkoutAsymcActions.checkoutDelete_async, deleteCheckout);
}
