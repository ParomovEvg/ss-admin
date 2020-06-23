import React from 'react';
import { createFipc } from 'react-fipc';

import './SideBar.scss';

interface SideBarProps {
  children?: any;
}

const SideBarComponent: React.FC<SideBarProps> = ({ children }) => {
  return <aside className="side-bar">{children}</aside>;
};

export const SideBar$ = createFipc(SideBarComponent);
