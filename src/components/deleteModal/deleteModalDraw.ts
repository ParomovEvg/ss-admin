import { DeleteModal$ } from './deleteModal';
import { useAction } from '../../hooks/use-action';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { drawListActions } from '../../redux/slices/draw/drawListSlice';
import { drawViewActions } from '../../redux/slices/draw/drawView';

export const DeleteModalDraw = DeleteModal$({
  useHandlerClick: () => {
    return useAction(drawListActions.delete);
  },
  useDeleteModalClose: () => {
    return useAction(drawViewActions.closeDeleteDrawModal);
  },
  useIsDeleteModal: () => {
    return useSelector<RootState, boolean>(
      (state) => state.draws.view.DrawDeteleModal.isDrawDeteleModal
    );
  },
  useGetId: () => {
    return useSelector<RootState, number>(
      (state) => state.draws.view.DrawDeteleModal.idDraw
    );
  },
  useTitle: () => 'Вы точно хотите удалить этот розыгрыш?',
});
