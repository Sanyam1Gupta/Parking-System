import {
  defaultAuthenticatedRoute,
  defaultUnauthenticatedRoute,
  getAllRoutesArray,
} from 'configurations/routing/Routes';
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Loader from '../../globals/components/Loader/Loader';

const isAuthenticated = () => false;
const AuthenticatedRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) => {
      return isAuthenticated() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: defaultUnauthenticatedRoute,
            state: { from: location },
          }}
        />
      );
    }}
  />
);

const UnauthenticatedRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) => {
      return isAuthenticated() ? (
        <Redirect
          to={{
            pathname: defaultAuthenticatedRoute,
            state: { from: location },
          }}
        />
      ) : (
        children
      );
    }}
  />
);

const allappRoutes = getAllRoutesArray();

const routes = allappRoutes.map(route => {
  const { component: Component } = route;
  return route.needAuth ? (
    <AuthenticatedRoute key={route.path} path={route.path} exact={route.exact}>
      <Component />
    </AuthenticatedRoute>
  ) : (
    <UnauthenticatedRoute
      key={route.path}
      path={route.path}
      exact={route.exact}
    >
      <Component />
    </UnauthenticatedRoute>
  );
});

const currentKey = window.location.pathname.split('/')[1] || '/';
// Specify the duration of the animation (on enter and on exit)
const timeout = { enter: 800, exit: 400 };

const ApplicationRouter = () => (
  <Router>
    <Suspense fallback={<Loader loaderStatus />}>
      <TransitionGroup component="div" className="transition-wrapper">
        <CSSTransition
          key={currentKey}
          timeout={timeout}
          classNames="pageSlider"
          mountOnEnter={false}
          unmountOnExit
        >
          <Switch>
            <>{routes}</>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Suspense>
  </Router>
);

export default ApplicationRouter;
