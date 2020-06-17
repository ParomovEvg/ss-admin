import { updateFieldStateSelector } from './../../redux/slices/viewSlice';
import {
  UpdateFieldModalComponent$,
  initialUpdateValuesType,
} from './UpdateFieldModal';
import { useAction } from '../../hooks/use-action';
import { useSelector } from 'react-redux';
import { FormikHelpers } from 'formik';
import { viewActions } from '../../redux/slices/viewSlice';

export type useUpdateModalProps = () => {
  updateFormHandler: (
    values: initialUpdateValuesType,
    action: FormikHelpers<initialUpdateValuesType>
  ) => void;
};

export const UpdateFieldModal$ = UpdateFieldModalComponent$({
  $carry: true,
  useCloseUpdateModal: () => {
    const closeUpdateFieldModal = useAction(viewActions.closeUpdateFieldModal);
    return (resetForm: () => void) => {
      resetForm();
      closeUpdateFieldModal();
    };
  },
  useUpdateModalState: () => useSelector(updateFieldStateSelector),
});
