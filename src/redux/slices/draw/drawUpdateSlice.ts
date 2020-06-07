import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const drawUpdateSlice = createSlice({
  name: 'draw/list/update',
  initialState: 0,
  reducers: {
    set: (state, action: PayloadAction<number>) => action.payload,
  },
});

export const drawUpdateActions = {
  ...drawUpdateSlice.actions,
};
