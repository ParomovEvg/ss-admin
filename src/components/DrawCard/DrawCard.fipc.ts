import { DrawCard$ } from './DrawCard';
import { useAction } from '../../hooks/use-action';
import { drawUpdateActions } from '../../redux/slices/draw/drawUpdateSlice';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelectorFactory } from '../../hooks/use-selector-factory';
import { drawIsLoadingFactory } from '../../redux/slices/draw/drawSelectors';
import { drawViewActions } from '../../redux/slices/draw/drawView';

export interface DrawCardHooks {
  useDraw: (
    id: number
  ) => {
    isLoading: boolean;
  };
  useOpenUpdateDrawModal: (
    id: number
  ) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const DrawCard = DrawCard$({
  useDraw: (id) => {
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
});
