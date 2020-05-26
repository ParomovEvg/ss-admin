import { asyncScreenActions } from './../../redux/slices/screensSlice';
import { DeleteModal$ } from './deleteModal';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';

export const DeleteModalScreen = DeleteModal$({
  useHandlerClick: () => {
    return useAction(asyncScreenActions.deleteScreen_async);
  },
  useDeleteModalClose: () => {
    return useAction(viewActions.closeScreenDeleteModal);
  },
  useIsDeleteModal: () => {
    return useSelector<RootState, boolean>(
      (state) => state.view.ScreenDeteleModal.isScreenDeteleModal
    );
  },
  useGetId: () => {
    return useSelector<RootState, number>(
      (state) => state.view.ScreenDeteleModal.idScreen
    );
  },
});
