import { nextDrawActions } from './../../redux/slices/draw/nextDrawSlice';
import { drawListActions } from './../../redux/slices/draw/drawListSlice';
import { AddDrawModal$, initialValuesType } from './AddDrawModal';
import { useAction } from '../../hooks/use-action';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { useCallback } from 'react';
import { FormikHelpers } from 'formik';
import { format } from 'date-fns';
import { drawViewActions } from '../../redux/slices/draw/drawView';
import { lastDrawSelector } from '../../redux/slices/draw/drawSelectors';

export type useAddDrawModalProps = () => {
  closeAddDrawModal: () => void;
  addDrawModalState: boolean;
  addDrawFormHandler: (
    values: initialValuesType,
    action: FormikHelpers<initialValuesType>
  ) => void;
};

export const AddDrawModal = AddDrawModal$({
  useAddDrawModalProps: () => {
    const closeAddDrawModal = useAction(drawViewActions.closeAddDrawModal);
    const addDrawModalState = useSelector<RootState, boolean>(
      (state) => state.draws.view.AddDrawdModal
    );
    const nextDraw = useAction(nextDrawActions.nextDraw);
    const addDrawAsync = useAction(drawListActions.add);
    const addDrawFormHandler = useCallback(
      (values: initialValuesType, action: FormikHelpers<initialValuesType>) => {
        if (values.isNextDraw) {
          nextDraw({ values, action });
        } else {
          addDrawAsync({ values, action });
        }
      },
      [addDrawAsync, nextDraw]
    );

    return {
      addDrawFormHandler,
      addDrawModalState,
      closeAddDrawModal,
    };
  },
  useInitialValues: () => {
    const startDate = Date.now();
    const endDate = Date.now();
    const start = format(startDate, `yyyy-MM-dd`);
    const end = format(endDate, `yyyy-MM-dd`);
    return {
      start: start,
      end: end,
      description: '',
      sLimit: '',
      qrLimit: '',
      isNextDraw: false,
      qrLimitPeriodMS: '',
    };
  },
  useNextDrawTime: () => {
    const lastDraw = useSelector(lastDrawSelector);
    const isLastDraw = lastDraw !== undefined;
    const lastDrawTime =
      lastDraw !== undefined ? new Date(lastDraw.end) : new Date();

    const lastDrawTimeFormat = format(lastDrawTime, `yyyy-MM-dd`);
    return {
      isLastDraw,
      lastDrawTimeFormat,
    };
  },
});
