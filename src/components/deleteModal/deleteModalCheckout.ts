import { checkoutAsymcActions } from './../../redux/slices/checkoutSlice';
import { DeleteModal$ } from './deleteModal';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';

export const DeleteModalCheckout = DeleteModal$({
  useHandlerClick: () => {
    return useAction(checkoutAsymcActions.checkoutDelete_async);
  },
  useDeleteModalClose: () => {
    return useAction(viewActions.closeCheckoutDeleteModal);
  },
  useIsDeleteModal: () => {
    return useSelector<RootState, boolean>(
      (state) => state.view.checkoutDeteleModal.isCheckoutDeteleModal
    );
  },
  useGetId: () => {
    return useSelector<RootState, number>(
      (state) => state.view.checkoutDeteleModal.idCheckout
    );
  },
  useTitle: () => 'Вы точно хотите удалить эту кассу?',
});
