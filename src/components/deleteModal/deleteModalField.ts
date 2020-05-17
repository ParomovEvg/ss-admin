import { RootState } from '../../redux/createStore';
import { useSelector } from 'react-redux';
import { viewActions } from '../../redux/slices/viewSlice';
import { DeleteModal$ } from './deleteModal';
import { useAction } from '../../hooks/use-action';
import { asyncFieldActions } from '../../redux/slices/fieldsSlice';

export const DeleteModalField = DeleteModal$({
  useHandlerClick: () => {
    return useAction(asyncFieldActions.deleteFieldAsync);
  },
  useDeleteModalClose: () => {
    return useAction(viewActions.closeDeleteFieldModal);
  },
  useIsDeleteModal: () => {
    return useSelector<RootState, boolean>(
      (state) => state.view.deteleModal.isDeteleModal
    );
  },
  useGetId: () => {
    return useSelector<RootState, number>((state) => state.view.deteleModal.id);
  },
});
