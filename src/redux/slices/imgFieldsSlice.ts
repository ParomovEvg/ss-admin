import { ImgDto } from './../../apiWorker/typings/index';
import { ImgFieldDto } from '../../apiWorker/typings/index';
import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

interface imgField extends ImgFieldDto {
  isLoading: boolean;
  addImgValue: string | undefined;
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
  addImg_async: createAction<number>('imgFields/addImg_async' as const),
  addImg_request: createAction<number>('imgFields/addImg_request' as const),
  addImg_error: createAction<number>('imgFields/addImg_error' as const),
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
    addImg: (state, action: PayloadAction<{ img: ImgDto; id: number }>) => {
      state.items.forEach((imgField) => {
        if (imgField.id === action.payload.id) {
          imgField.img.push(action.payload.img);
          imgField.isLoading = false;
          imgField.addImgValue = undefined;
          if (imgField.img.length > 3) imgField.img.shift();
        }
      });
    },
    addImgValue: (
      state,
      action: PayloadAction<{ newUrl?: string; id: number }>
    ) => {
      state.items = state.items.map((imgField) => {
        if (imgField.id === action.payload.id) {
          imgField.addImgValue = action.payload.newUrl;
        }
        return imgField;
      });
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
    [imgFieldsActionsAsync.addImg_request.type]: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items.forEach((imgField) => {
        if (imgField.id === action.payload) imgField.isLoading = true;
      });
    },
    [imgFieldsActionsAsync.addImg_error.type]: (
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
