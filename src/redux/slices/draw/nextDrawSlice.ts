import { createSlice, createAction } from '@reduxjs/toolkit';
import { FormikHelpers } from 'formik';
import { initialValuesType } from '../../../components/AddDrawModal/AddDrawModal';

const nextDrawActionsI = {
  nextDraw: createAction<{
    values: initialValuesType;
    action: FormikHelpers<initialValuesType>;
  }>('draw/next/add' as const),
  nextDraw_successful: createAction('draw/next/add_successful' as const),
};

export const nextDrawSlice = createSlice({
  name: 'draw/next',
  initialState: 0,
  reducers: {},
});

export const nextDrawActions = {
  ...nextDrawSlice.actions,
  ...nextDrawActionsI,
};
