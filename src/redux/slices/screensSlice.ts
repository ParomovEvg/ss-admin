import { imgFieldsActionsAsync, imgFieldsActions } from './imgFieldsSlice';
import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { FlatScreenDto } from '../../apiWorker/typings';
import { asyncTextFieldActions, TextFieldsActions } from './textFieldsSlice';
import { markdownActions, markdowmAsyncActions } from './markdownFieldSlice';

export interface ScreenType extends FlatScreenDto {
  isLoading: boolean;
}

export type ScreensType = {
  screensList: ScreenType[];
  activeScreen: number;
  isLoading: boolean;
};

const initialState: ScreensType = {
  screensList: [],
  activeScreen: 0,
  isLoading: false,
};

export const asyncScreenActions = {
  addScreenRequest: createAction('screens/addScreen_request'),
  getScreen: createAction<number>('screens/getScreen' as const),
  getScreenRequest: createAction<number>('screens/getScreen_request' as const),
  getScreensRequest: createAction('screens/getAllScreens_request' as const),
  getScreenError: createAction<number>('screens/getScreen_error' as const),
  getScreensError: createAction('screens/getScreens_error' as const),
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
      state.isLoading = false;
    },
    // addScreen: (state, action: PayloadAction<{ screen: ScreenType }>) => {
    //   state.screensList = [...state.screensList, action.payload.screen];
    // },
    getActiveScreen: (state, action: PayloadAction<number>) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.isLoading = false;
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
        if (screen.id === action.payload) screen.isLoading = true;
      });
    },
    [asyncTextFieldActions.addTextFieldRequest.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.isLoading = true;
      });
    },
    [TextFieldsActions.addTextField.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload.id) screen.isLoading = false;
      });
    },
    [asyncTextFieldActions.addTextFieldError.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.isLoading = false;
      });
    },
    [asyncScreenActions.getScreensRequest.type]: (state) => {
      state.isLoading = true;
    },
    [asyncScreenActions.getScreenError.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.isLoading = false;
      });
    },
    [asyncScreenActions.getScreensError.type]: (state) => {
      state.isLoading = false;
    },
    [imgFieldsActionsAsync.addImgFieldRequest.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.isLoading = true;
      });
    },
    [imgFieldsActions.addImgField.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload.id) screen.isLoading = false;
      });
    },
    [markdowmAsyncActions.addMarkdownField_request.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.isLoading = true;
      });
    },
    [markdowmAsyncActions.addMarkdownField_error.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.isLoading = false;
      });
    },
    [markdownActions.addMarkdownField.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload.screenId) screen.isLoading = false;
      });
    },
  },
});

export const screensActions = {
  ...screensSlice.actions,
};
