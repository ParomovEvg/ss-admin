import React, { ComponentType, ReactNode, useEffect } from 'react';
import { Route, BrowserRouter, Switch, Redirect, useParams } from 'react-router-dom';
import { Nav$ } from '../../components/Nav/Nav';
import { Hook } from '../../../hooks/types';
import { Auth } from '../auth/Auth.tx';
import { createFipc } from 'react-fipc';
import { Home$ } from '../Home/Home';
import { screenServer } from '../../../lib/screenService';
// import { Home } from '@material-ui/icons';

const Home = Home$({ useFields: () => {
	const { id }= useParams<{ id: string }>()
	useEffect(() => {
		const fields = screenServer.getScreen(parseInt(id))
		console.log(fields);
		
	})
	return [{
		name: 'dfg',
		id: 1
	}]
}})

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
						<Route path={`/screen/:id`} component={Home} />
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
