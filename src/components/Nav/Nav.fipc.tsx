import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { Nav } from './Nav';
import { createFipc } from 'react-fipc';
import { useAction } from '../../hooks/use-action';
export const Nav$ = createFipc(Nav)({
  $carry: true,
  useIsOpenMenu: () =>
    useSelector<RootState, boolean>((state) => state.view.isMenuOpen),
  useCloseHandler: () => {
    const handlerClose = useAction(viewActions.closeMenu);
    return () => handlerClose();
  },
});
