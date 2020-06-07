import { drawListActions } from '../../redux/slices/draw/drawListSlice';
import { UpdateDrawModal$, initialUpdateValuesType } from './UpdateDrawModal';
import { useAction } from '../../hooks/use-action';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { useCallback } from 'react';
import { FormikHelpers } from 'formik';
import { drawViewActions } from '../../redux/slices/draw/drawView';

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
  useUpdateModalState: () =>
    useSelector<RootState, boolean>(
      (state) => state.draws.view.updateDrawModal
    ),
  useInitialValues: () => {
    return {
      sLimit: '',
      qrLimit: '',
      qrLimitPeriodMS: '',
    };
  },
});
