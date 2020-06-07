import { AddNextDrawModal$, initialNextValuesType } from './AddNextDrawModal';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { useCallback } from 'react';
import { FormikHelpers } from 'formik';
import { format } from 'date-fns';
import { drawNowEndSelector } from '../../redux/slices/draw/drawSelectors';
import { nextDrawActions } from '../../redux/slices/draw/nextDrawSlice';
import { drawViewActions } from '../../redux/slices/draw/drawView';

export type useAddNextDrawModalProps = () => {
  closeAddNextDrawModal: () => void;
  addNextDrawModalState: boolean;
  addNextDrawFormHandler: (
    values: initialNextValuesType,
    action: FormikHelpers<initialNextValuesType>
  ) => void;
};

export const AddNextDrawModal = AddNextDrawModal$({
  useAddNextDrawModalProps: () => {
    const closeAddNextDrawModal = useAction(drawViewActions.closeNextDrawModal);
    const addNextDrawModalState = useSelector<RootState, boolean>(
      (state) => state.draws.view.nextDrawModal
    );
    const nextDraw = useAction(nextDrawActions.nextDraw);
    const addNextDrawFormHandler = useCallback(
      (
        values: initialNextValuesType,
        action: FormikHelpers<initialNextValuesType>
      ) => {
        nextDraw({ values, action });
      },
      []
    );

    return {
      addNextDrawFormHandler,
      addNextDrawModalState,
      closeAddNextDrawModal,
    };
  },
  useInitialValues: (startDraw: string) => {
    return {
      end: startDraw,
      description: '',
      sLimit: '',
      qrLimit: '',
      qrLimitPeriodMS: '',
    };
  },
  useStartDraw: () => {
    const endNowDate: string = useSelector(drawNowEndSelector);
    const startDate = endNowDate === '' ? Date.now() : new Date(endNowDate);
    const start = format(startDate, `yyyy-MM-dd`);
    return start;
  },
});
