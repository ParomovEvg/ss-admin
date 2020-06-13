import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { drawType } from './drawListSlice';

const drawNowInitState = null;

export const drawNowSlise = createSlice({
  name: 'draw/now',
  initialState: drawNowInitState as drawType | null,
  reducers: {
    get: () => {},
    getSuccessful: (state, action: PayloadAction<drawType>) => {
      return action.payload;
    },
    delete: () => null,
  },
});

export const drawNowActions = {
  ...drawNowSlise.actions,
};
