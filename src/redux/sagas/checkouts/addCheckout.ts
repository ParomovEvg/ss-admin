import { Either } from 'useful-monads';
import { call, put, take, select } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import {
  checkoutAsymcActions,
  checkoutActions,
} from '../../slices/checkoutSlice';
import { RootSelector } from '../../createStore';
import {
  CheckoutAlreadyExists,
  FlatCheckoutDto,
} from '../../../apiWorker/typings';
import { CheckoutsServer } from '../../../apiWorker/servers/checkoutsServer';

export function* addCheckout() {
  yield take(checkoutAsymcActions.checkoutAdd_async);
  yield put(checkoutAsymcActions.checkoutAdd_request());
  const checkoutFn = yield select<RootSelector<string>>(
    (state) => state.checkouts.addCheckoutFn
  );
  const checkoutAddress = yield select<RootSelector<string>>(
    (state) => state.checkouts.addCheckoutAddress
  );
  try {
    const checkoutEither: Either<
      CheckoutAlreadyExists,
      FlatCheckoutDto
    > = yield call(CheckoutsServer.addCheckout, {
      fn: checkoutFn,
      address: checkoutAddress,
    });
    const checkout = checkoutEither.extract();
    if (checkout.right) {
      yield put(
        checkoutActions.addCheckout({
          ...checkout.right,
          isLoading: false,
        })
      );
    } else {
      yield put(checkoutAsymcActions.checkoutAdd_error());
      NotificationManager.error(checkout.left.message);
    }
  } catch (error) {
    yield put(checkoutAsymcActions.checkoutAdd_error());
    NotificationManager.error(
      'Что-то пошло не так, но мы обязательно разберемся'
    );
  }
}
