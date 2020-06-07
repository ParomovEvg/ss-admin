import { DrawNowCard$ } from './DrawNowCard';
import { useSelectorFactory } from '../../hooks/use-selector-factory';
import { drawIsLoadingFactory } from '../../redux/slices/draw/drawSelectors';
import { useAction } from '../../hooks/use-action';
import { drawUpdateActions } from '../../redux/slices/draw/drawUpdateSlice';
import { drawViewActions } from '../../redux/slices/draw/drawView';

export interface DrawNowCardHooks {
  useNowDraw: (
    id: number
  ) => {
    isLoading: boolean;
  };
  useOpenUpdateDrawModal: (
    id: number
  ) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  useOpenDeleteDrawModal: (
    id: number
  ) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  useOpenNextDrawModal: () => (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export const DrawNowCard = DrawNowCard$({
  useNowDraw: (id) => {
    const isLoading = useSelectorFactory(drawIsLoadingFactory, id);
    return {
      isLoading,
    };
  },
  useOpenUpdateDrawModal: (id) => {
    const openUpdateDrawModal = useAction(drawUpdateActions.set);
    const openUpdateViewModal = useAction(drawViewActions.openUpdateModal);
    return (e) => {
      e.stopPropagation();
      openUpdateDrawModal(id);
      openUpdateViewModal();
    };
  },
  useOpenDeleteDrawModal: (id) => {
    const openDeleteDrawModal = useAction(drawViewActions.openDeleteDrawModal);
    return (e) => {
      e.stopPropagation();
      openDeleteDrawModal(id);
    };
  },
  useOpenNextDrawModal: () => {
    const openNextDrawModal = useAction(drawViewActions.openNextDrawModal);
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      openNextDrawModal();
    };
  },
});
