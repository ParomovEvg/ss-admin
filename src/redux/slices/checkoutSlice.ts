import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { FlatCheckoutDto } from '../../apiWorker/typings';

export interface CheckoutType extends FlatCheckoutDto {
  isLoading: boolean;
}

export const checkoutAsymcActions = {
  getAllCheckoutAsync: createAction('checkout/getAllCheckoutAsync' as const),
  getAllCheckout_request: createAction(
    'checkout/getAllCheckout_request' as const
  ),
  getAllCheckout_error: createAction('checkout/getAllCheckout_error' as const),
  checkoutDelete_async: createAction<number>('checkout/delete_async' as const),
  checkoutDelete_request: createAction<number>(
    'checkout/delete_request' as const
  ),
  checkoutDelete_error: createAction<number>('checkout/delete_error' as const),
  checkoutAdd_async: createAction('checkout/add_async' as const),
  checkoutAdd_request: createAction('checkout/add_request' as const),
  checkoutAdd_error: createAction('checkout/add_error' as const),
};

interface initialStateType {
  items: CheckoutType[];
  isLoading: boolean;
  addCheckoutFn: string;
  addCheckoutAddress: string;
}

const initialState: initialStateType = {
  items: [],
  isLoading: false,
  addCheckoutAddress: '',
  addCheckoutFn: '',
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setAddCheckoutAddress: (state, action: PayloadAction<string>) => {
      state.addCheckoutAddress = action.payload;
    },
    setAddCheckoutFn: (state, action: PayloadAction<string>) => {
      state.addCheckoutFn = action.payload;
    },
    getAllCheckout: (state, action: PayloadAction<CheckoutType[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    deleteCheckout: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((checkout) => {
        return checkout.id != action.payload;
      });
    },
    addCheckout: (state, action: PayloadAction<CheckoutType>) => {
      state.items = [...state.items, action.payload];
      state.isLoading = false;
      state.addCheckoutFn = '';
      state.addCheckoutAddress = '';
    },
  },
  extraReducers: {
    [checkoutAsymcActions.getAllCheckout_request.type]: (state) => {
      state.isLoading = true;
    },
    [checkoutAsymcActions.getAllCheckout_error.type]: (state) => {
      state.isLoading = false;
    },
    [checkoutAsymcActions.checkoutDelete_request.type]: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items.forEach((checkout) => {
        if (checkout.id === action.payload) checkout.isLoading = true;
      });
    },
    [checkoutAsymcActions.checkoutDelete_error.type]: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items.forEach((checkout) => {
        if (checkout.id === action.payload) checkout.isLoading = false;
      });
    },
    [checkoutAsymcActions.checkoutAdd_request.type]: (state) => {
      state.isLoading = true;
    },
    [checkoutAsymcActions.checkoutAdd_error.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export const checkoutActions = {
  ...checkoutSlice.actions,
};
