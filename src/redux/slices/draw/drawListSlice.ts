import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  createAction,
} from '@reduxjs/toolkit';
import { FlatDrawDto } from '../../../apiWorker/typings';
import { FormikHelpers } from 'formik';
import { initialValuesType } from '../../../components/AddDrawModal/AddDrawModal';
import { initialUpdateValuesType } from '../../../components/UpdateDrawModal/UpdateDrawModal';

export interface drawType extends FlatDrawDto {
  isLoading?: boolean;
}

const IdrawListActions = {
  add: createAction<{
    values: initialValuesType;
    action: FormikHelpers<initialValuesType>;
  }>('draw/list/add' as const),
  addSuccessful: createAction('draw/list/addSuccessful' as const),
  delete: createAction<number>('draw/list/delete' as const),
  getAll: createAction('draw/list/getAll' as const),
  getNow: createAction('draw/list/getNow' as const),
  update: createAction<{
    values: initialUpdateValuesType;
    action: FormikHelpers<initialUpdateValuesType>;
  }>('draw/list/update' as const),
  updateSuccessful: createAction('draw/list/update_successful' as const),
};

const drawListAdapter = createEntityAdapter<drawType>({
  selectId: (draw) => draw.id,
  sortComparer: (prevDraw, nextDraw) => {
    const prevDate = new Date(prevDraw.end);
    const nextDate = new Date(nextDraw.end);
    return +nextDate - +prevDate;
  },
});

export const drawListSlise = createSlice({
  name: 'draw/list',
  initialState: drawListAdapter.getInitialState(),
  reducers: {
    getAllSuccessful: drawListAdapter.setAll,
    isLoadingDraw: (state, action: PayloadAction<number>) =>
      drawListAdapter.updateOne(state, {
        id: action.payload,
        changes: {
          isLoading: true,
        },
      }),
    isNoLoadingDraw: (state, action: PayloadAction<number>) =>
      drawListAdapter.updateOne(state, {
        id: action.payload,
        changes: {
          isLoading: false,
        },
      }),
  },
});

export const drawListActions = {
  ...drawListSlise.actions,
  ...IdrawListActions,
};
