import { createSlice, createAction } from '@reduxjs/toolkit';

const qrPaginationActionsEdition = {
  getqrCount: createAction('qr/pagination/count'),
};

export interface IqrPaginationState {
  page: number;
  count: number;
}

export const initialStatePagination: IqrPaginationState = {
  page: 1,
  count: 0,
};

export const qrPaginationSlise = createSlice({
  name: 'qr/pagination',
  initialState: initialStatePagination,
  reducers: {
    setPage: (state, a) => {
      state.page = a.payload;
    },
    setCount: (state, a) => {
      state.count = a.payload;
    },
  },
});

export const qrPaginationActions = {
  ...qrPaginationSlise.actions,
  ...qrPaginationActionsEdition,
};
