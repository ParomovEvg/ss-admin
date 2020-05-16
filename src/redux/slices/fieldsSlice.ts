import { valuesActions } from './fieldValuesSlice';
import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

export type fieldType = {
  id: number;
  name: string;
  status?: string;
};

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
  },
  extraReducers: {
    [valuesActions.setFieldValueRequest.type]: (state, action) => {
      state.forEach((field) => {
        if (field.id === action.payload.fieldId) field.status = 'loading';
      });
    },
    [valuesActions.setValue.type]: (state, action) => {
      state.forEach((field) => {
        if (field.id === action.payload.fieldId) field.status = 'none';
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
