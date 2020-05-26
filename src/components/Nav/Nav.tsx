import React, { ReactNode } from 'react';
import './Nav.scss';
import { Divider, Drawer, List, Button } from '@material-ui/core';
import { CallBackHook, Hook } from '../../hooks/types';
import { NavItem } from './NavItem';
import { viewActions } from '../../redux/slices/viewSlice';
import { useAction } from '../../hooks/use-action';

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
  const isOpen = useIsOpenMenu();
  const closeHandler = useCloseHandler();
  const openAddScreenModal = useAction(viewActions.openAddScreenModal);
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
      <Button onClick={() => openAddScreenModal()} color="primary">
        Создать экран
      </Button>
      <Divider />
    </Drawer>
  );
};
