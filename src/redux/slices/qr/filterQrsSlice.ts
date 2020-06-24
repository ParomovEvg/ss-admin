import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

export interface IqrFilterState {
  filterByDrawId: string;
  filterByCheckoutId: string;
  filterByPhone: string;
  filterByFd: string;
  filterByFp: string;
}

export interface IInputType {
  name: keyof IqrFilterState;
  value: string;
}

const qrFilterState = {
  filterByDrawId: '',
  filterByCheckoutId: '',
  filterByPhone: '',
  filterByFd: '',
  filterByFp: '',
};

const qrFilterActionsEdition = {
  phoneHandler: createAction<string>('qr/filter/phone_handler'),
  filterQr: createAction('qr/filter'),
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
