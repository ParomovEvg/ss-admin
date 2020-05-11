import React, { ReactNode, useCallback } from 'react';
import './Nav.scss';
import { Divider, Drawer, List } from '@material-ui/core';
import { CallBackHook, Hook } from '../../../hooks/types';
import { createFipc } from 'react-fipc';
import { RootState } from '../../../model/createStore';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../../model/viewSlice';
import { NavItem } from './NavItem';
import { useSelector } from 'react-redux';
import { authService } from '../../../lib/authService';

export interface NavHooks {
  useCloseHandler: CallBackHook;
  useIsOpenMenu: Hook<boolean>;
}
export interface NavProps extends NavHooks {
  className?: string;
  mainLinks: LinksList;
  screenLinks: LinksList;
}
export type LinksList = {
  path: string;
  name: string;
  icon?: ReactNode;
}[];

export const Nav: React.FC<NavProps> = ({
  className,
  useCloseHandler,
  useIsOpenMenu,
  mainLinks,
  screenLinks,
}) => {
  const onClickTestHandler = useCallback(() => {
    authService.getProfile();
  }, []);

  const isOpen = useIsOpenMenu();
  // console.log(isOpen);
  const closeHandler = useCloseHandler();
  return (
    <Drawer anchor={'left'} open={isOpen} onClose={closeHandler}>
      <List>
        {mainLinks.map(({ path, name, icon }) => (
          <NavItem path={path} name={name} icon={icon} key={path} />
        ))}
      </List>
      <Divider />
      <List>
        {screenLinks.map(({ name, path }) => (
          <NavItem path={path} name={name} key={path} />
        ))}
      </List>
      <button className="text" onClick={onClickTestHandler}>
        Тестовая кнопка
      </button>
    </Drawer>
  );
};

export const Nav$ = createFipc(Nav)({
  $carry: true,
  useIsOpenMenu: () =>
    useSelector<RootState, boolean>((state) => state.view.isMenuOpen),
  useCloseHandler: () => {
    const handlerClose = useAction(viewActions.closeMenu);
    return () => handlerClose();
  },
});
