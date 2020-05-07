import React, { ComponentType, ReactNode } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Nav$ } from '../../components/Nav/Nav';
import { Hook } from '../../../hooks/types';
import { Auth } from '../auth/Auth.tx';
import { createFipc } from 'react-fipc';

export type PathList = {
  path: string;
  name: string;
  component: ComponentType;
  icon?: ReactNode;
}[];

export type NavigationHooks = {
  useMainRouts: Hook<PathList>;
  useAdditionalRouts: Hook<PathList>;
  useScreenRouts: Hook<PathList>;
  useIsAuth: Hook<boolean>;
};
export interface NavigationProps extends NavigationHooks {}
export const NavigationComponent: React.FC<NavigationProps> = ({
  useMainRouts,
  useAdditionalRouts,
  useScreenRouts,
  useIsAuth,
}) => {
  const mainRouts = useMainRouts();
  const additionalRouts = useAdditionalRouts();
  const screensRouts = useScreenRouts();
  const isAuth = useIsAuth();
  return (
    <BrowserRouter>
      {isAuth ? (
        <>
          <Nav$ $render mainLinks={mainRouts} screenLinks={screensRouts} />
          <Switch>
            {screensRouts.map(({ path, component }) => (
              <Route path={path} exact key={path} component={component} />
            ))}
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
