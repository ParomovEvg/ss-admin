import { TextDto, ChangeImgField } from '../../apiWorker/typings';
import {
  createSlice,
  PayloadAction,
  createAction,
  createSelector,
} from '@reduxjs/toolkit';
import { FormikHelpers } from 'formik';
import { initialUpdateValuesType } from '../../components/UpdateFieldModal/UpdateFieldModal';
import { RootState } from '../createStore';
import { imgFieldSelector } from './imgFieldsSlice';

export type TextFieldType = {
  id: number;
  name: string;
  description: string;
  values: TextDto[];
  isLoading: boolean;
};
export type SetTextValueType = {
  text: string;
  fieldId: number;
};

export interface ValueType {
  value: TextDto;
  fieldId: number;
}
export type DeleteFieldType = {
  id?: number;
};
export interface AddTextFieldFormValuesType {
  name: string;
  description: string;
  value: string;
}

export type InitialStateType = {
  items: TextFieldType[];
  addTextfieldName: string;
  addTextFieldValue: string;
  addTextFieldDescription: string;
  updateFieldId?: number;
};

export const asyncTextFieldActions = {
  deleteTextFieldAsync: createAction<number>(
    'TextFields/deleteFieldsAsync' as const
  ),
  deleteTextFieldRequest: createAction<number>(
    'TextFields/deleteFields_request' as const
  ),
  deleteTextFieldError: createAction<number>(
    'TextFields/deleteFieldsError' as const
  ),
  addTextFieldValueAsync: createAction<SetTextValueType>(
    'TextFields/setFieldValueAsync' as const
  ),
  addTextFieldValueRequest: createAction<number>(
    'TextFields/setFieldValue_request' as const
  ),
  addTextFieldAsync: createAction<number>('TextFields/addFieldAsync' as const),
  addTextFieldRequest: createAction<number>(
    'TextFields/addField_request' as const
  ),
  addTextFieldError: createAction<number>('TextFields/addField_error' as const),
  updateTextField_async: createAction<{
    values: ChangeImgField;
    action: FormikHelpers<initialUpdateValuesType>;
  }>('TextFields/update_async' as const),
};

const initialState: InitialStateType = {
  items: [],
  addTextfieldName: '',
  addTextFieldValue: '',
  addTextFieldDescription: '',
};
export const TextFieldsSlice = createSlice({
  name: 'TextFields',
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
    getTextFields: (state, action: PayloadAction<TextFieldType[]>) => {
      state.items = action.payload;
    },
    deleteTextField: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((field) => {
        return field.id != action.payload;
      });
    },
    addTextValue: (state, action: PayloadAction<ValueType>) => {
      state.items.forEach((field) => {
        if (field.id === action.payload.fieldId) {
          field.values.push(action.payload.value);
          field.isLoading = false;
        }
      });
    },
    addTextField: (
      state,
      action: PayloadAction<{ item: TextFieldType; id: number }>
    ) => {
      state.items.push(action.payload.item);
      state.addTextfieldName = '';
      state.addTextFieldValue = '';
      state.addTextFieldDescription = '';
    },
    setAddTextFieldName: (state, action: PayloadAction<string>) => {
      state.addTextfieldName = action.payload;
    },
    setAddTextFieldValue: (state, action: PayloadAction<string>) => {
      state.addTextFieldValue = action.payload;
    },
    setAddTextFieldDescription: (state, action: PayloadAction<string>) => {
      state.addTextFieldDescription = action.payload;
    },
    updateField: (state, action: PayloadAction<TextFieldType>) => {
      state.items = state.items.map((imgField) => {
        if (imgField.id === action.payload.id) {
          return action.payload;
        }
        return imgField;
      });
    },
    setUpdateFieldId: (state, action: PayloadAction<number>) => {
      state.updateFieldId = action.payload;
    },
  },
  extraReducers: {
    [asyncTextFieldActions.addTextFieldValueRequest.type]: (state, action) => {
      state.items.forEach((field) => {
        if (field.id === action.payload) field.isLoading = true;
      });
    },
    [asyncTextFieldActions.deleteTextFieldRequest.type]: (state, action) => {
      state.items.forEach((field) => {
        if (field.id === action.payload) field.isLoading = true;
      });
    },
    [asyncTextFieldActions.deleteTextFieldError.type]: (state, action) => {
      state.items.forEach((field) => {
        if (field.id === action.payload) field.isLoading = false;
      });
    },
  },
});

export const textFieldSelector = (state: RootState) => state.TextFields;
export const updateTextFieldIdModalSelector = (state: RootState) =>
  state.TextFields?.updateFieldId ?? 0;

export const updateTextFieldNameFactory = (id: number) =>
  createSelector(
    textFieldSelector,
    (textField) =>
      textField.items.find((imgField) => imgField.id === id)?.name ?? ''
  );

export const updateTextFieldDescriptionFactory = (id: number) =>
  createSelector(
    textFieldSelector,
    (textField) =>
      textField.items.find((imgField) => imgField.id === id)?.description ?? ''
  );

export const TextFieldsActions = {
  ...TextFieldsSlice.actions,
};
