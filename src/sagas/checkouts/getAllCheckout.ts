import { CheckoutsServer } from '../../apiWorker/servers/checkoutsServer';
import {
  checkoutAsymcActions,
  checkoutActions,
} from './../../redux/slices/checkoutSlice';
import { call, put, take } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { FlatCheckoutDto } from '../../apiWorker/typings';

export function* getAllCheckout() {
  yield take(checkoutAsymcActions.getAllCheckoutAsync);
  yield put(checkoutAsymcActions.getAllCheckout_request());
  try {
    const checkouts: FlatCheckoutDto[] = yield call(
      CheckoutsServer.getAllCheckout
    );
    yield put(
      checkoutActions.getAllCheckout(
        checkouts.map((checkout) => ({
          ...checkout,
          isLoading: false,
        }))
      )
    );
  } catch (error) {
    yield put(checkoutAsymcActions.getAllCheckout_error());
    NotificationManager.error('Упс, кто-то сломался, но жить будем');
  }
}
