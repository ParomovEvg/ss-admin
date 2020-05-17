import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { FlatScreenDto } from '../../apiWorker/typings';
import { asyncFieldActions, fieldsActions } from './fieldsSlice';

export interface ScreenType extends FlatScreenDto {
  status: string;
}

export type ScreensType = {
  screensList: ScreenType[];
  activeScreen: number;
};

const initialState: ScreensType = {
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
      action: PayloadAction<{ screens: ScreenType[] }>
    ) => {
      state.screensList = action.payload.screens;
    },
    // addScreen: (state, action: PayloadAction<{ screen: ScreenType }>) => {
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
    [asyncFieldActions.addFieldRequest.type]: (state) => {
      state.screensList.forEach((screen) => {
        if (screen.id === state.activeScreen) screen.status = 'loading';
      });
    },
    [fieldsActions.addField.type]: (state) => {
      state.screensList.forEach((screen) => {
        if (screen.id === state.activeScreen) screen.status = 'done';
      });
    },
    [asyncFieldActions.addFieldError.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.status = 'done';
      });
    },
  },
});

export const screensActions = {
  ...screensSlice.actions,
};
