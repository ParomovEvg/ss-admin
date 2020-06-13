import { InfoMarkdownModal$ } from './markdownInfoModalComponent';
import { useAction } from '../../hooks/use-action';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { viewActions } from '../../redux/slices/viewSlice';

export type useInfoMarkdownModalProps = () => {
  closeInfoMarkdownModal: () => void;
  infoMarkdownModalState: boolean;
};

export const InfoMarkdownModal = InfoMarkdownModal$({
  useInfoMarkdownModal: () => {
    const closeInfoMarkdownModal = useAction(
      viewActions.closeInfoMarkdownModal
    );
    const infoMarkdownModalState = useSelector<RootState, boolean>(
      (state) => state.view.infoMarkdownModal
    );
    return {
      infoMarkdownModalState,
      closeInfoMarkdownModal,
    };
  },
});
