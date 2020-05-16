import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { FlatScreenDto } from '../../apiWorker/typings';

export interface screenType extends FlatScreenDto {
  status: string;
}

export type screens = {
  screensList: screenType[];
  activeScreen: number;
};

const initialState: screens = {
  screensList: [],
  activeScreen: 0,
};

export const asyncScreenActions = {
  addScreenRequest: createAction('screens/addScreens_request'),
  getScreen: createAction<number>('screens/getScreen' as const),
  getScreenRequest: createAction<number>('screens/getScreen_request' as const),
};

export const screensSlice = createSlice({
  name: 'screens',
  initialState,
  reducers: {
    getAllScreens: (
      state,
      action: PayloadAction<{ screens: screenType[] }>
    ) => {
      state.screensList = action.payload.screens;
    },
    // addScreen: (state, action: PayloadAction<{ screen: screenType }>) => {
    //   state.screensList = [...state.screensList, action.payload.screen];
    // },
    getActiveScreen: (state, action: PayloadAction<number>) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.status = 'done';
      });
      state.activeScreen = action.payload;
    },
  },
  extraReducers: {
    [asyncScreenActions.getScreenRequest.type]: (
      state,
      action: ReturnType<typeof asyncScreenActions.getScreenRequest>
    ) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.status = 'loading';
      });
    },
  },
});

export const screensActions = {
  ...screensSlice.actions,
};
