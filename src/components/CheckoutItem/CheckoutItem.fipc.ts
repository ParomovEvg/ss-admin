import { RootState } from './../../redux/createStore';
import { useSelector } from 'react-redux';
import { CheckoutItem$ } from './CheckoutItemComponent';

export const CheckoutItem = CheckoutItem$({
  useCheckoutItem: (id: number) => {
    const isLoading = useSelector<RootState, boolean>(
      (state) =>
        state.checkouts.items.find((checkout) => checkout.id === id)
          ?.isLoading ?? false
    );
    return {
      isLoading,
    };
  },
});
