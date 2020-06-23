import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { FormikHelpers } from 'formik';

import { UseFormikInitState } from '../../../components/SearchQr/SearchQr.fipc';

export interface IqrFilterState {
  filterByDrawId: string;
  filterByCheckoutId: string;
  filterByPhone: string;
}

export interface IInputType {
  name: keyof IqrFilterState;
  value: string;
}

const qrFilterState = {
  filterByDrawId: '',
  filterByCheckoutId: '',
  filterByPhone: '',
};

const qrFilterActionsEdition = {
  phoneHandler: createAction<string>('qr/filter/phone_handler'),
  filterQr: createAction<{
    values: UseFormikInitState;
    formikActions: FormikHelpers<UseFormikInitState>;
  }>('qr/filter'),
};

export const qrFilterSlise = createSlice({
  name: 'qr/filter',
  initialState: qrFilterState,
  reducers: {
    changeInput: (state, action: PayloadAction<IInputType>) => {
      state[action.payload.name] = action.payload.value;
    },
  },
});

export const qrFilterActions = {
  ...qrFilterSlise.actions,
  ...qrFilterActionsEdition,
};
