import { DeleteModal$ } from './deleteModal';
import { useAction } from '../../hooks/use-action';
import { imgFieldsActionsAsync } from '../../redux/slices/imgFieldsSlice';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';

export const DeleteModalTextField = DeleteModal$({
  useHandlerClick: () => {
    return useAction(imgFieldsActionsAsync.deleteImgfieldAsync);
  },
  useDeleteModalClose: () => {
    return useAction(viewActions.closeDeleteImgFieldModal);
  },
  useIsDeleteModal: () => {
    return useSelector<RootState, boolean>(
      (state) => state.view.imgFieldDeteleModal.isImgFieldDeteleModal
    );
  },
  useGetId: () => {
    return useSelector<RootState, number>(
      (state) => state.view.imgFieldDeteleModal.idImgField
    );
  },
  useTitle: () => 'Вы точно хотите удалить эту кассу?',
});
