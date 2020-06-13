import { drawListActions } from '../../redux/slices/draw/drawListSlice';
import { UpdateDrawModal$, initialUpdateValuesType } from './UpdateDrawModal';
import { useAction } from '../../hooks/use-action';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { FormikHelpers } from 'formik';
import { drawViewActions } from '../../redux/slices/draw/drawView';
import { useSelectorFactory } from '../../hooks/use-selector-factory';
import {
  updateDrawStateSelector,
  updateDrawIdSelector,
  drawSLimitFactory,
  drawQrLimitFactory,
  drawQrLimitPeriodMSFactory,
} from '../../redux/slices/draw/drawSelectors';

export type useUpdateModalProps = () => {
  updateFormHandler: (
    values: initialUpdateValuesType,
    action: FormikHelpers<initialUpdateValuesType>
  ) => void;
};

export const UpdateDrawModal = UpdateDrawModal$({
  useUpdateModalProps: () => {
    const updateDrawAsync = useAction(drawListActions.update);
    const updateFormHandler = useCallback(
      (values, action) => {
        updateDrawAsync({ values, action });
      },
      [updateDrawAsync]
    );

    return {
      updateFormHandler,
    };
  },
  useCloseUpdateModal: () => useAction(drawViewActions.closeUpdateModal),
  useUpdateModalState: () => useSelector(updateDrawStateSelector),
  useInitialValues: () => {
    const id = useSelector(updateDrawIdSelector);
    const sLimit = useSelectorFactory(drawSLimitFactory, id);
    const qrLimit = useSelectorFactory(drawQrLimitFactory, id);
    const qrLimitPeriodMS = useSelectorFactory(drawQrLimitPeriodMSFactory, id);
    return {
      sLimit,
      qrLimit,
      qrLimitPeriodMS,
    };
  },
});
