import { initialUpdateValuesType } from './../../components/UpdateFieldModal/UpdateFieldModal';
import { RootState } from './../createStore';
import { ImgDto, ChangeImgField } from './../../apiWorker/typings/index';
import { ImgFieldDto } from '../../apiWorker/typings/index';
import {
  createSlice,
  PayloadAction,
  createAction,
  createSelector,
} from '@reduxjs/toolkit';
import { FormikHelpers } from 'formik';

interface imgField extends ImgFieldDto {
  isLoading: boolean;
  addImgValue?: string | undefined;
  addImgValueType?: string | undefined;
  addTheSameImgId?: number | undefined;
}

type InitialStateType = {
  items: imgField[];
  addImgFieldName: string;
  addImgFieldDescription?: string;
  updateImgFieldId?: number;
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
  addTheSameImg_async: createAction<number>(
    'imgFields/addTheSameImg_async' as const
  ),
  addTheSameImg_request: createAction<number>(
    'imgFields/addTheSameImg_request' as const
  ),
  addTheSameImg_error: createAction<number>(
    'imgFields/addTheSameImg_error' as const
  ),
  updateImgField_async: createAction<{
    values: ChangeImgField;
    action: FormikHelpers<initialUpdateValuesType>;
  }>('imgFields/update_async' as const),
};

export const imgFieldsSlice = createSlice({
  name: 'imgFields',
  initialState,
  reducers: {
    isLoadingField: (state, action: PayloadAction<number>) => {
      state.items.forEach((imgField) => {
        if (imgField.id === action.payload) imgField.isLoading = true;
      });
    },
    isNoLoadingField: (state, action: PayloadAction<number>) => {
      state.items.forEach((imgField) => {
        if (imgField.id === action.payload) imgField.isLoading = false;
      });
    },
    getImgFields: (state, action: PayloadAction<imgField[]>) => {
      state.items = action.payload;
    },
    deleteImgField: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (imgField) => imgField.id !== action.payload
      );
    },
    updateImgField: (state, action: PayloadAction<imgField>) => {
      state.items = state.items.map((imgField) => {
        if (imgField.id === action.payload.id) {
          return action.payload;
        }
        return imgField;
      });
    },
    setUpdateFieldId: (state, action: PayloadAction<number>) => {
      state.updateImgFieldId = action.payload;
    },
    changeImgField: (
      state,
      action: PayloadAction<{ id: number; imgField: imgField }>
    ) => {
      state.items = state.items.map((imgField) => {
        if (imgField.id === action.payload.id) {
          imgField = action.payload.imgField;
        }
        return imgField;
      });
    },
    clearAddImg: (state, action: PayloadAction<number>) => {
      state.items.forEach((imgField) => {
        if (imgField.id === action.payload) {
          imgField.addImgValue = undefined;
          imgField.addImgValueType = undefined;
          imgField.addTheSameImgId = undefined;
        }
      });
    },
    setAddImgFieldName: (state, action: PayloadAction<string>) => {
      state.addImgFieldName = action.payload;
    },
    setAddImgFieldDescription: (state, action: PayloadAction<string>) => {
      state.addImgFieldDescription = action.payload;
    },
    addImgField: (
      state,
      action: PayloadAction<{ item: imgField; id: number }>
    ) => {
      state.items.push(action.payload.item);
      state.addImgFieldName = '';
      state.addImgFieldDescription = '';
    },
    addImg: (state, action: PayloadAction<{ img: ImgDto; id: number }>) => {
      state.items.forEach((imgField) => {
        if (imgField.id === action.payload.id) {
          imgField.img.push(action.payload.img);
          imgField.isLoading = false;
          imgField.addImgValue = undefined;
          imgField.addImgValueType = undefined;
          imgField.addTheSameImgId = undefined;
          if (imgField.img.length > 3) imgField.img.shift();
        }
      });
    },
    addImgValue: (
      state,
      action: PayloadAction<{
        newUrl?: string;
        id: number;
        addImgValueType?: string;
        addTheSameImgId?: number;
      }>
    ) => {
      state.items = state.items.map((imgField) => {
        if (imgField.id === action.payload.id) {
          imgField.addImgValue = action.payload.newUrl;
          imgField.addImgValueType = action.payload.addImgValueType;
          imgField.addTheSameImgId = action.payload.addTheSameImgId;
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
    [imgFieldsActionsAsync.addTheSameImg_request.type]: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items.forEach((imgField) => {
        if (imgField.id === action.payload) imgField.isLoading = true;
      });
    },
    [imgFieldsActionsAsync.addTheSameImg_error.type]: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items.forEach((imgField) => {
        if (imgField.id === action.payload) imgField.isLoading = false;
      });
    },
  },
});

export const updateImgFieldidSelector = (state: RootState) =>
  state.imgFields?.updateImgFieldId ?? 0;

export const imgFieldSelector = (state: RootState) => state.imgFields;

export const updateImgFieldNameFactory = (id: number) =>
  createSelector(
    imgFieldSelector,
    (imgFields) =>
      imgFields.items.find((imgField) => imgField.id === id)?.name ?? ''
  );

export const updateImgFieldDescriptionFactory = (id: number) =>
  createSelector(
    imgFieldSelector,
    (imgFields) =>
      imgFields.items.find((imgField) => imgField.id === id)?.description ?? ''
  );

export const imgFieldsActions = {
  ...imgFieldsSlice.actions,
};
