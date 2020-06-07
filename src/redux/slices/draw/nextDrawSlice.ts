import { createSlice, createAction } from '@reduxjs/toolkit';
import { initialNextValuesType } from '../../../components/AddNextDrawModal/AddNextDrawModal';
import { FormikHelpers } from 'formik';

const nextDrawActionsI = {
  nextDraw: createAction<{
    values: initialNextValuesType;
    action: FormikHelpers<initialNextValuesType>;
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
