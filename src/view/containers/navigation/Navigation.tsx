import { Navigation$, PathList } from './NavigationComponent';
import { Home } from '../Home/Home';
import { Draws } from '../Draws/Draws';
import { Redirect } from 'react-router-dom';
import React from 'react';
import { Assignment } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../model/createStore';

const screens: PathList = [
  {
    path: '/screen/home',
    name: 'Home',
    component: Home,
  },
];

const mainRouts: PathList = [
  {
    name: 'Розыгрыши',
    path: '/draws',
    component: Draws,
    icon: <Assignment />,
  },
];
const additionalRouts: PathList = [
  {
    name: 'Главная страница',
    path: '/',
    component: () => <Redirect to="/draws" />,
  },
];
export const Navigation = Navigation$({
  useMainRouts: () => mainRouts,
  useAdditionalRouts: () => additionalRouts,
  useScreenRouts: () => screens,
  useIsAuth: () =>
    useSelector<RootState, boolean>((state) => Boolean(state.auth.token)),
});
