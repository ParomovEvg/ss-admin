import React, { ComponentType, ReactNode } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Nav$ } from '../Nav/Nav.fipc';
import { Hook } from '../../hooks/types';
import { Auth } from '../auth/Auth.fipc';
import { createFipc } from 'react-fipc';
import { Screen } from '../Screen/Screen.fipc';
import { NotificationContainer } from 'react-notifications';
import { Loader } from '../Loader/Loader';
export type PathList = {
  path: string;
  name: string;
  component?: ComponentType;
  icon?: ReactNode;
}[];

export type NavigationHooks = {
  useMainRouts: Hook<PathList>;
  useAdditionalRouts: Hook<PathList>;
  useScreenRouts: Hook<PathList>;
  useIsAuth: Hook<boolean>;
  useIsLoadingApp: Hook<boolean>;
};
export interface NavigationProps extends NavigationHooks {}
export const NavigationComponent: React.FC<NavigationProps> = ({
  useMainRouts,
  useAdditionalRouts,
  useScreenRouts,
  useIsAuth,
  useIsLoadingApp,
}) => {
  const mainRouts = useMainRouts();
  const additionalRouts = useAdditionalRouts();
  const screensRouts = useScreenRouts();
  const isAuth = useIsAuth();
  const isLoading = useIsLoadingApp();
  return (
    <BrowserRouter>
      <NotificationContainer />
      <Loader isLoading={isLoading} />
      {isAuth ? (
        <>
          <Nav$ $render mainLinks={mainRouts} screenLinks={screensRouts} />
          <Switch>
            <Route path={`/screen/:id`} component={Screen} />
            {mainRouts.map(({ path, component }) => (
              <Route path={path} key={path} component={component} />
            ))}
            {additionalRouts.map(({ path, component }) => (
              <Route path={path} key={path} component={component} />
            ))}
          </Switch>
        </>
      ) : (
        <Auth />
      )}
    </BrowserRouter>
  );
};

export const Navigation$ = createFipc(NavigationComponent);
