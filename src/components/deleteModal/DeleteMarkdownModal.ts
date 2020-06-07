import { markdowmAsyncActions } from './../../redux/slices/markdownFieldSlice';
import { DeleteModal$ } from './deleteModal';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';

export const DeleteMarkdownModal = DeleteModal$({
  useHandlerClick: () => {
    return useAction(markdowmAsyncActions.deleteMarkdown_async);
  },
  useDeleteModalClose: () => {
    return useAction(viewActions.closeDeleteMarkdownFieldModal);
  },
  useIsDeleteModal: () => {
    return useSelector<RootState, boolean>(
      (state) => state.view.markdownFieldDeteleModal.isMarkdownFieldDeteleModal
    );
  },
  useGetId: () => {
    return useSelector<RootState, number>(
      (state) => state.view.markdownFieldDeteleModal.idMarkdownField
    );
  },
  useTitle: () => 'Вы точно хотите удалить это поле?',
});
