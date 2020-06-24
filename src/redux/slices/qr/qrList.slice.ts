import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  createAction,
} from '@reduxjs/toolkit';

import { FlatAllQrDto } from './../../../apiWorker/typings/index';

const qrListActionsEdition = {};

export interface qrType extends FlatAllQrDto {
  isLoading?: boolean;
}

const qrListAdapter = createEntityAdapter<qrType>({
  selectId: (qr) => qr.id,
});

export const qrListSlise = createSlice({
  name: 'qr/list',
  initialState: qrListAdapter.getInitialState(),
  reducers: {
    getAllSuccessful: qrListAdapter.setAll,
    isLoadingQr: (state, action: PayloadAction<number>) =>
      qrListAdapter.updateOne(state, {
        id: action.payload,
        changes: {
          isLoading: true,
        },
      }),
    isNoLoadingQr: (state, action: PayloadAction<number>) =>
      qrListAdapter.updateOne(state, {
        id: action.payload,
        changes: {
          isLoading: false,
        },
      }),
  },
});

export const qrListActions = {
  ...qrListSlise.actions,
  ...qrListActionsEdition,
};
