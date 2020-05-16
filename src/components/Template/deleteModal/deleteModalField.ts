import { RootState } from './../../../redux/createStore';
import { useSelector } from 'react-redux';
import { viewActions } from './../../../redux/slices/viewSlice';
import { useDeleteModal$ } from './deleteModal';
import { useAction } from '../../../hooks/use-action';
import { fieldsActions } from '../../../redux/slices/fieldsSlice';

export const DeleteModalField = useDeleteModal$({
  useDeleteAction: () => {
    return useAction(fieldsActions.deleteField);
  },
  useDeleteModalToggle: () => {
    return useAction(viewActions.deleteModalToggle);
  },
  useIsDeleteModal: () => {
    return useSelector<RootState, boolean>(
      (state) => state.view.deteleModal.isDeteleModal
    );
  },
  text: 'Вы точно хотите удалить это поле?',
  useGetId: () => {
    return useSelector<RootState, number>((state) => state.view.deteleModal.id);
  },
});
