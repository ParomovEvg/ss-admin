import { LinksList } from './Nav';
import { CallBackHook } from '../../hooks/types';
import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { createFipc } from 'react-fipc';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';

type ArrayItem<T> = T extends Array<infer U> ? U : T;
interface NavItemProps extends ArrayItem<LinksList> {
  useOnClick: CallBackHook;
}
const NavItemComponent: React.FC<NavItemProps> = ({
  path,
  icon,
  name,
  useOnClick,
}) => {
  const handleClose = useOnClick();
  return (
    <ListItem
      onClick={handleClose}
      button
      component={Link}
      to={path}
      key={path}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={name} />
    </ListItem>
  );
};

export const NavItem = createFipc(NavItemComponent)({
  useOnClick: () => {
    const handleClose = useAction(viewActions.closeMenu);
    return () => handleClose();
  },
});
