import React from 'react';

const HomeContainer = React.lazy(() => import('../../pages/Home/Home'));
const LandingPageContainer = React.lazy(() =>
  import('../../pages/LandingPage/LandingPage'),
);

// defaultRoute is nothing but the landing page for the application
const appRoutes = {
  root: {
    defaultRoute: {
      path: '/',
      component: HomeContainer,
      needAuth: false,
      exact: true,
    },
    landingRoute: {
      path: '/kr',
      component: LandingPageContainer,
      needAuth: false,
      exact: true,
    },
  },
};

const defaultAuthenticatedRoute = '/';
const defaultUnauthenticatedRoute = '/';

const getAllRoutesArray = () =>
  Object.keys(appRoutes)
    .map(key =>
      Object.keys(appRoutes[key]).reduce((allRoutes, innerKey) => {
        allRoutes.push(appRoutes[key][innerKey]);
        return allRoutes;
      }, []),
    )
    .flat();

export {
  appRoutes,
  defaultAuthenticatedRoute,
  defaultUnauthenticatedRoute,
  getAllRoutesArray,
};
