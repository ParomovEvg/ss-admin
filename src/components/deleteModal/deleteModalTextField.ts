import { DeleteModal$ } from './deleteModal';
import { useAction } from '../../hooks/use-action';
import { asyncTextFieldActions } from '../../redux/slices/textFieldsSlice';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';

export const DeleteModalImgField = DeleteModal$({
  useHandlerClick: () => {
    return useAction(asyncTextFieldActions.deleteTextFieldAsync);
  },
  useDeleteModalClose: () => {
    return useAction(viewActions.closeDeleteTextFieldModal);
  },
  useIsDeleteModal: () => {
    return useSelector<RootState, boolean>(
      (state) => state.view.textFieldDeteleModal.isTextFieldDeteleModal
    );
  },
  useGetId: () => {
    return useSelector<RootState, number>(
      (state) => state.view.textFieldDeteleModal.idTextField
    );
  },
});
