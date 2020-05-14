import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { FlatScreenDto } from '../../apiWorker/typings';

export type screens = {
  screensList: FlatScreenDto[];
  activeScreen: number;
};

const initialState: screens = {
  screensList: [],
  activeScreen: 0,
};

export const screensSlice = createSlice({
  name: 'screens',
  initialState,
  reducers: {
    getAllScreens: (
      state,
      action: PayloadAction<{ screens: FlatScreenDto[] }>
    ) => {
      state.screensList = action.payload.screens;
    },
    addScreen: (state, action: PayloadAction<{ screen: FlatScreenDto }>) => {
      state.screensList = [...state.screensList, action.payload.screen];
    },
    getActiveScreen: (state, action: PayloadAction<number>) => {
      state.activeScreen = action.payload;
    },
  },
});

const asyncScreenActions = {
  addScreenRequest: createAction('screens/addScreens_request'),
  getScreenRequest: createAction<number>('screens/getScreen_request' as const),
};

export const screensActions = {
  ...screensSlice.actions,
  ...asyncScreenActions,
};
