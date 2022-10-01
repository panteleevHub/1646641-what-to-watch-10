import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from '@reduxjs/toolkit';
import {AppRoute} from '../../const';
import {State} from '../../types/state';
import {redirectToRoute} from '../action';
import {redirect} from './redirect';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to NotFoundScreen', () => {
    store.dispatch(redirectToRoute(AppRoute.NotFound));
    expect(fakeHistory.location.pathname).toBe(AppRoute.NotFound);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.NotFound),
    ]);
  });

  it('should not be redirect to NotFoundScreen because of bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Player});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Player);
  });
});
