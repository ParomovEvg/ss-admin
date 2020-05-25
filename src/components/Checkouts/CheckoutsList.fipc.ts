import { RootState } from '../../redux/createStore';
import { useSelector } from 'react-redux';
import {
  checkoutAsymcActions,
  CheckoutType,
} from '../../redux/slices/checkoutSlice';
import { useEffect } from 'react';
import { Checkout$ } from './CheckoutsListComponent';
import { useAction } from '../../hooks/use-action';

export const Checkout = Checkout$({
  useGetCheckouts: () => {
    const getCheckouts = useAction(checkoutAsymcActions.getAllCheckoutAsync);
    const checkouts = useSelector<RootState, CheckoutType[]>(
      (state) => state.checkouts.items
    );
    useEffect(() => {
      getCheckouts();
    }, []);
    return {
      checkouts,
    };
  },
});
