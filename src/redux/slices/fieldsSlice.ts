import { TextDto } from '../../apiWorker/typings';
import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

export type FieldType = {
  id: number;
  name: string;
  values: TextDto[];
  status?: string;
};
export type SetValueType = {
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
export interface AddFieldFormValuesType {
  name: string;
  value: string;
}

export interface AddFieldAction {
  screenId: number;
}

export type InitialStateType = {
  items: FieldType[];
  addfieldName: string;
  addFieldValue: string;
};

export const asyncFieldActions = {
  deleteFieldAsync: createAction<number>('fields/deleteFieldsAsync' as const),
  deleteFieldRequest: createAction<number>(
    'fields/deleteFields_request' as const
  ),
  deleteFieldError: createAction<number>('fields/deleteFieldsError' as const),
  addFieldValueAsync: createAction<SetValueType>(
    'fields/setFieldValueAsync' as const
  ),
  addFieldValueRequest: createAction<number>(
    'fields/setFieldValue_request' as const
  ),
  addFieldAsync: createAction<AddFieldAction>('fields/addFieldAsync' as const),
  addFieldRequest: createAction('fields/addField_request' as const),
  addFieldError: createAction<number>('fields/addField_error' as const),
};

const initialState: InitialStateType = {
  items: [],
  addfieldName: '',
  addFieldValue: '',
};
export const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    getFields: (state, action: PayloadAction<FieldType[]>) => {
      state.items = action.payload;
    },
    deleteField: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((field) => {
        return field.id != action.payload;
      });
    },
    addValue: (state, action: PayloadAction<ValueType>) => {
      state.items.forEach((field) => {
        if (field.id === action.payload.fieldId) {
          field.values.push(action.payload.value);
          field.status = 'done';
        }
      });
    },
    addField: (state, action: PayloadAction<FieldType>) => {
      state.items.push(action.payload);
      state.addfieldName = '';
      state.addFieldValue = '';
    },
    setAddFieldName: (state, action: PayloadAction<string>) => {
      state.addfieldName = action.payload;
    },
    setAddFieldValue: (state, action: PayloadAction<string>) => {
      state.addFieldValue = action.payload;
    },
  },
  extraReducers: {
    [asyncFieldActions.addFieldValueRequest.type]: (state, action) => {
      state.items.forEach((field) => {
        if (field.id === action.payload) field.status = 'loading';
      });
    },
    [asyncFieldActions.deleteFieldRequest.type]: (state, action) => {
      state.items.forEach((field) => {
        if (field.id === action.payload) field.status = 'loading';
      });
    },
    [asyncFieldActions.deleteFieldError.type]: (state, action) => {
      state.items.forEach((field) => {
        if (field.id === action.payload) field.status = 'done';
      });
    },
  },
});

export const fieldsActions = {
  ...fieldsSlice.actions,
};
