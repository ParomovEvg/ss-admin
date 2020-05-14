import { valuesActions } from './fieldValuesSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type fieldType = {
  id: number;
  name: string;
  status?: string;
};

export type fieldsType = fieldType[];

const initialState: fieldsType = [];

export const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    getFields: (state, action: PayloadAction<fieldType[]>) => {
      return action.payload;
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
  },
});

export const fieldsActions = {
  ...fieldsSlice.actions,
};
