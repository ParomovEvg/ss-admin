import { ImgFieldDto } from '../../apiWorker/typings/index';
import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

interface imgField extends ImgFieldDto {
  isLoading: boolean;
}

type InitialStateType = {
  items: imgField[];
  addImgFieldName: string;
};

const initialState: InitialStateType = {
  items: [],
  addImgFieldName: '',
};

export const imgFieldsActionsAsync = {
  deleteImgfieldAsync: createAction<number>(
    'imgFields/deleteImgfiled' as const
  ),
  deleteImgfieldRequest: createAction<number>(
    'imgFields/deleteImgfiled_request' as const
  ),
  deleteImgfieldError: createAction<number>(
    'imgFields/deleteImgfiled_error' as const
  ),
  addImgFieldAsync: createAction<number>('imgFields/addImgfiled' as const),
  addImgFieldRequest: createAction<number>(
    'imgFields/addImgfiled_request' as const
  ),
  addImgFieldError: createAction<number>(
    'imgFields/addImgfiled_error' as const
  ),
};

export const imgFieldsSlice = createSlice({
  name: 'imgFields',
  initialState,
  reducers: {
    getImgFields: (state, action: PayloadAction<imgField[]>) => {
      state.items = action.payload;
    },
    deleteImgField: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (imgField) => imgField.id !== action.payload
      );
    },
    setAddImgFieldName: (state, action: PayloadAction<string>) => {
      state.addImgFieldName = action.payload;
    },
    addImgField: (
      state,
      action: PayloadAction<{ item: imgField; id: number }>
    ) => {
      state.items.push(action.payload.item);
      state.addImgFieldName = '';
    },
  },
  extraReducers: {
    [imgFieldsActionsAsync.deleteImgfieldRequest.type]: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items.forEach((imgField) => {
        if (imgField.id === action.payload) imgField.isLoading = true;
      });
    },
    [imgFieldsActionsAsync.deleteImgfieldError.type]: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items.forEach((imgField) => {
        if (imgField.id === action.payload) imgField.isLoading = false;
      });
    },
  },
});

export const imgFieldsActions = {
  ...imgFieldsSlice.actions,
};
