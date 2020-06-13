import { imgFieldsActionsAsync, imgFieldsActions } from './imgFieldsSlice';
import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { FlatScreenDto } from '../../apiWorker/typings';
import { asyncTextFieldActions, TextFieldsActions } from './textFieldsSlice';
import { markdownActions, markdowmAsyncActions } from './markdownFieldSlice';

export interface ScreenType extends FlatScreenDto {
  isLoading: boolean;
  renameScreenName?: string;
}

export type ScreensType = {
  screensList: ScreenType[];
  activeScreen: number;
  isLoading: boolean;
  addScreenName: string;
  addScreenDescription: string;
};

const initialState: ScreensType = {
  screensList: [],
  activeScreen: 0,
  isLoading: false,
  addScreenName: '',
  addScreenDescription: '',
};

export const asyncScreenActions = {
  addScreenRequest: createAction('screens/addScreen_request'),
  getScreen: createAction<number>('screens/getScreen' as const),
  getScreensRequest: createAction('screens/getAllScreens_request' as const),
  getScreensError: createAction('screens/getScreens_error' as const),
  getScreenRequest: createAction<number>('screens/getScreen_request' as const),
  getScreenError: createAction<number>('screens/getScreen_error' as const),
  renameScreen_async: createAction<number>(
    'screens/renameScreen_async' as const
  ),
  renameScreen_request: createAction<number>(
    'screens/renameScreen_request' as const
  ),
  renameScreen_error: createAction<number>(
    'screens/renameScreen_error' as const
  ),
  addScreen_async: createAction('screens/addScreen_async' as const),
  addScreen_request: createAction('screens/addScreen_request' as const),
  addScreen_error: createAction('screens/addScreen_error' as const),
  deleteScreen_async: createAction<number>(
    'screens/deleteScreen_async' as const
  ),
  deleteScreen_request: createAction<number>(
    'screens/deleteScreen_request' as const
  ),
  deleteScreen_error: createAction<number>(
    'screens/deleteScreen_error' as const
  ),
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
      state.addScreenName = '';
      state.addScreenDescription = '';
    },
    getActiveScreen: (state, action: PayloadAction<number>) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.isLoading = false;
      });
      state.activeScreen = action.payload;
    },
    setRenameScreenName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload.id) {
          screen.renameScreenName = action.payload.name;
        }
      });
    },
    setAddScreenName: (state, action: PayloadAction<string>) => {
      state.addScreenName = action.payload;
    },
    setAddScreenDescription: (state, action: PayloadAction<string>) => {
      state.addScreenDescription = action.payload;
    },
    renameScreen: (state, action: PayloadAction<ScreenType>) => {
      state.screensList = state.screensList.map((screen) => {
        if (screen.id === action.payload.id) return action.payload;
        return screen;
      });
    },
    isLoadingScreen: (state, action: PayloadAction<number>) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.isLoading = true;
      });
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
    [imgFieldsActionsAsync.addImgFieldError.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload.id) screen.isLoading = false;
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
    [asyncScreenActions.renameScreen_request.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.isLoading = true;
      });
    },

    [asyncScreenActions.renameScreen_error.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.isLoading = false;
      });
    },
    [asyncScreenActions.addScreen_request.type]: (state) => {
      state.isLoading = true;
    },
    [asyncScreenActions.addScreen_error.type]: (state) => {
      state.isLoading = false;
    },
    [asyncScreenActions.deleteScreen_request.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.isLoading = true;
      });
    },
    [asyncScreenActions.deleteScreen_error.type]: (state, action) => {
      state.screensList.forEach((screen) => {
        if (screen.id === action.payload) screen.isLoading = false;
      });
    },
  },
});

export const screensActions = {
  ...screensSlice.actions,
};
