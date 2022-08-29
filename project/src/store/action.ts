import {createAction} from '@reduxjs/toolkit';

const redirectToRoute = createAction(
  'route/redirectToRoute',
  (route: string) => ({
    payload: route,
  })
);

export {
  redirectToRoute,
};
