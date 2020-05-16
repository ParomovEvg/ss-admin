import { TextDto } from '../../apiWorker/typings';
import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

export type fieldType = {
  id: number;
  name: string;
  values: TextDto[];
  status?: string;
};

export type setValueType = {
  text: string;
  fieldId: number;
};

export interface valueType {
  value: TextDto;
  fieldId: number;
}

export type deleteFieldType = {
  id?: number;
};

export type fieldsType = fieldType[];

const initialState: fieldsType = [];

export const asyncFieldActions = {
  deleteFieldAsync: createAction<number>('fields/deleteFieldsAsync' as const),
  deleteFieldRequest: createAction<number>(
    'fields/deleteFields_request' as const
  ),
  setFieldValueRequest: createAction<setValueType>(
    'screens/setFieldValue_request' as const
  ),
};
export const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    getFields: (state, action: PayloadAction<fieldType[]>) => {
      return action.payload;
    },
    deleteField: (state, action: PayloadAction<number>) => {
      return state.filter((field) => field.id !== action.payload);
    },
    setValue: (state, action: PayloadAction<valueType>) => {
      state.forEach((field) => {
        if (field.id === action.payload.fieldId) {
          field.values.push(action.payload.value);
          field.status = 'done';
        }
      });
    },
  },
  extraReducers: {
    [asyncFieldActions.setFieldValueRequest.type]: (state, action) => {
      state.forEach((field) => {
        if (field.id === action.payload.fieldId) field.status = 'loading';
      });
    },
    [asyncFieldActions.deleteFieldRequest.type]: (state, action) => {
      state.forEach((field) => {
        if (field.id === action.payload) field.status = 'loading';
      });
    },
  },
});

export const fieldsActions = {
  ...fieldsSlice.actions,
};
