import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from './api';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchFilmsAction,
  fetchFilmAction,
  addFavoriteFilmAction,
  fetchFavoriteFilmsAction,
  removeFavoriteFilmAction
} from './api-actions';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {createFakeFilm, createFakeFilms} from '../utils/mocks';
import {redirectToRoute} from '../store/action';
import {createAPIRoute} from '../utils/utils';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is "auth" when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, {avatarUrl: 'avatarPath'});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);
    const fulfilledAction = store.getActions().find(({type}) => type === checkAuthAction.fulfilled.type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);

    expect(fulfilledAction).toMatchObject({type: checkAuthAction.fulfilled.type, payload: 'avatarPath'});
  });

  it('should save authorization token and get avatarUrl when POST /login', async () => {
    const fakeAuthData: AuthData = {email: 'email@gmail.com', password: 'somepassword1'};

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'sometoken', avatarUrl: 'avatarPath'});

    await store.dispatch(loginAction(fakeAuthData));

    const actions = store.getActions().map(({type}) => type);
    const fulfilledAction = store.getActions().find(({type}) => type === loginAction.fulfilled.type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type
    ]);

    expect(fulfilledAction).toMatchObject({type: loginAction.fulfilled.type, payload: 'avatarPath'});

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'sometoken');
  });

  it('should delete authorization token from local storage when DELETE /logout', async () => {
    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
  });

  it('should dispatch fetchFilmsAction when GET /films', async () => {
    const store = mockStore();
    const mockFilms = createFakeFilms();

    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, mockFilms);

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);
    const fulfilledAction = store.getActions().find(({type}) => type === fetchFilmsAction.fulfilled.type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type
    ]);

    expect(fulfilledAction).toMatchObject({type: fetchFilmsAction.fulfilled.type, payload: mockFilms});
  });

  describe('Fetch film action', () => {
    it('should get a film when server return 200', async () => {
      const store = mockStore();
      const mockFilm = createFakeFilm();

      mockAPI
        .onGet(createAPIRoute(APIRoute.Film, mockFilm.id))
        .reply(200, mockFilm);

      await store.dispatch(fetchFilmAction(mockFilm.id));

      const actions = store.getActions().map(({type}) => type);
      const fulfilledAction = store.getActions().find(({type}) => type === fetchFilmAction.fulfilled.type);

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.fulfilled.type
      ]);

      expect(fulfilledAction).toMatchObject({type: fetchFilmAction.fulfilled.type, payload: mockFilm});
    });

    it('should be redirect to NotFoundScreen when server return 404', async () => {
      const store = mockStore();
      const mockFilm = createFakeFilm();

      mockAPI
        .onGet(createAPIRoute(APIRoute.Film, mockFilm.id))
        .reply(404);

      await store.dispatch(fetchFilmAction(mockFilm.id));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        redirectToRoute.type,
        fetchFilmAction.fulfilled.type
      ]);
    });
  });

  it('should dispatch addFavoriteFilmAction when POST /favorite/id/1', async () => {
    const store = mockStore();
    const mockFilm = createFakeFilm();
    const mockFilms = createFakeFilms();

    mockAPI
      .onPost(`${APIRoute.FavoriteFilms}/${mockFilm.id}/1`)
      .reply(200, mockFilm);

    mockAPI
      .onGet(APIRoute.FavoriteFilms)
      .reply(200, mockFilms);

    await store.dispatch(addFavoriteFilmAction(mockFilm.id));

    const actions = store.getActions().map(({type}) => type);
    const fulfilledAction = store.getActions().find(({type}) => type === addFavoriteFilmAction.fulfilled.type);

    expect(actions).toEqual([
      addFavoriteFilmAction.pending.type,
      fetchFavoriteFilmsAction.pending.type,
      fetchFavoriteFilmsAction.fulfilled.type,
      addFavoriteFilmAction.fulfilled.type
    ]);

    expect(fulfilledAction).toMatchObject({type: addFavoriteFilmAction.fulfilled.type, payload: mockFilm});
  });

  it('should dispatch removeFavoriteFilmAction when POST /favorite/id/0', async () => {
    const store = mockStore();
    const mockFilm = createFakeFilm();
    const mockFilms = createFakeFilms();

    mockAPI
      .onPost(`${APIRoute.FavoriteFilms}/${mockFilm.id}/0`)
      .reply(200, mockFilm);

    mockAPI
      .onGet(APIRoute.FavoriteFilms)
      .reply(200, mockFilms);

    await store.dispatch(removeFavoriteFilmAction(mockFilm.id));

    const actions = store.getActions().map(({type}) => type);
    const fulfilledAction = store.getActions().find(({type}) => type === removeFavoriteFilmAction.fulfilled.type);

    expect(actions).toEqual([
      removeFavoriteFilmAction.pending.type,
      fetchFavoriteFilmsAction.pending.type,
      fetchFavoriteFilmsAction.fulfilled.type,
      removeFavoriteFilmAction.fulfilled.type
    ]);

    expect(fulfilledAction).toMatchObject({type: removeFavoriteFilmAction.fulfilled.type, payload: mockFilm});
  });
});
