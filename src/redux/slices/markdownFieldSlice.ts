import { MdDto } from './../../apiWorker/typings/index';
import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { MdFieldContentDto } from '../../apiWorker/typings';

export interface MarkdowmType extends MdFieldContentDto {
  isLoading: boolean;
  addValueText?: string | undefined;
}

export const markdowmAsyncActions = {
  deleteMarkdown_async: createAction<number>(
    'markdowmField/delete_async' as const
  ),
  deleteMarkdown_request: createAction<number>(
    'markdowmField/delete_request' as const
  ),
  deleteMarkdown_error: createAction<number>(
    'markdowmField/delete_error' as const
  ),
  addMarkdownValue_async: createAction<number>(
    'markdowmField/addValue_async' as const
  ),
  addMarkdownValue_request: createAction<number>(
    'markdowmField/addValue_request' as const
  ),
  addMarkdownValue_error: createAction<number>(
    'markdowmField/addValue_error' as const
  ),
  addMarkdownField_async: createAction<number>('markdowmField/addField_async'),
  addMarkdownField_request: createAction<number>(
    'markdowmField/addField_request'
  ),
  addMarkdownField_error: createAction<number>('markdowmField/addField_error'),
};

interface InitialStateType {
  items: MarkdowmType[];
  addMarkdownFieldName: string;
  addMarkdownFieldLabel: string;
}

const initialState: InitialStateType = {
  items: [],
  addMarkdownFieldName: '',
  addMarkdownFieldLabel: '',
};

export const markdowmSlice = createSlice({
  name: 'markdowmField',
  initialState,
  reducers: {
    getAllMarkdowm: (state, action: PayloadAction<MarkdowmType[]>) => {
      state.items = action.payload;
    },
    setAddValueText: (
      state,
      action: PayloadAction<{ id: number; text: string }>
    ) => {
      state.items.forEach((markdownField) => {
        if (markdownField.id === action.payload.id) {
          markdownField.addValueText = action.payload.text;
        }
      });
    },
    addMarkdownValue: (
      state,
      action: PayloadAction<{ id: number; value: MdDto }>
    ) => {
      state.items.forEach((markdownField) => {
        if (markdownField.id === action.payload.id) {
          markdownField.values.push(action.payload.value);
          markdownField.isLoading = false;
          markdownField.addValueText = undefined;
        }
      });
    },
    addMarkdownField: (
      state,
      action: PayloadAction<{ markdownField: MarkdowmType; screenId: number }>
    ) => {
      state.items.push(action.payload.markdownField);
      state.addMarkdownFieldName = '';
      state.addMarkdownFieldLabel = '';
    },
    clearMarkdownValue: (state, action: PayloadAction<number>) => {
      state.items.forEach((markdownField) => {
        if (markdownField.id === action.payload) {
          markdownField.addValueText = undefined;
        }
      });
    },
    setAddMarkdownFieldName: (state, action: PayloadAction<string>) => {
      state.addMarkdownFieldName = action.payload;
    },
    setAddMarkdownFieldLabel: (state, action: PayloadAction<string>) => {
      state.addMarkdownFieldLabel = action.payload;
    },
    deleteMarkdownField: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (markdownField) => markdownField.id !== action.payload
      );
    },
  },
  extraReducers: {
    [markdowmAsyncActions.deleteMarkdown_request.type]: (state, action) => {
      state.items.forEach((markdownField) => {
        if (markdownField.id === action.payload) {
          markdownField.isLoading = true;
        }
      });
    },
    [markdowmAsyncActions.addMarkdownValue_request.type]: (state, action) => {
      state.items.forEach((markdownField) => {
        if (markdownField.id === action.payload) {
          markdownField.isLoading = true;
        }
      });
    },
    [markdowmAsyncActions.addMarkdownValue_error.type]: (state, action) => {
      state.items.forEach((markdownField) => {
        if (markdownField.id === action.payload) {
          markdownField.isLoading = false;
        }
      });
    },
  },
});

export const markdownActions = {
  ...markdowmSlice.actions,
};
