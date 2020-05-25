import { Navigation$, PathList } from './Navigation';
import { Draws } from '../Draws/Draws';
import { Redirect } from 'react-router-dom';
import React from 'react';
import { Assignment } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { FlatScreenDto } from '../../apiWorker/typings';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Checkout } from '../Checkouts/CheckoutsList.fipc';

const useScreenRouts = () => {
  const screens = useSelector<RootState, FlatScreenDto[]>(
    (state) => state.screens.screensList
  );
  return screens.map(({ id, name }) => ({
    path: `/screen/${id}`,
    name,
  }));
};

const mainRouts: PathList = [
  {
    name: 'Розыгрыши',
    path: '/draws',
    component: Draws,
    icon: <Assignment />,
  },
  {
    name: 'Кассы',
    path: '/checkouts',
    component: Checkout,
    icon: <ShoppingBasketIcon />,
  },
];

const useIsLoadingApp = () => {
  const isLoading = useSelector<RootState, boolean>(
    (state) => state.screens.isLoading
  );
  return isLoading;
};

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
  useScreenRouts,
  useIsAuth: () =>
    useSelector<RootState, boolean>((state) => Boolean(state.auth.token)),
  useIsLoadingApp,
});
