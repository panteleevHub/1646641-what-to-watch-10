import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {APIRoute, AuthorizationStatus} from '../../const';
import {createAPI} from '../../services/api';
import {addFavoriteFilmAction, removeFavoriteFilmAction} from '../../services/api-actions';
import {State} from '../../types/state';
import {createFakeFilm, createFakeFilms} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import MyListButton from './my-list-button';

describe('Component: MyListButton', () => {
  const fakeFilm = createFakeFilm();
  const fakeFilms = createFakeFilms();
  const history = createMemoryHistory();

  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  const store = mockStore({
    DATA: {favoriteFilms: fakeFilms},
    USER: {authorizationStatus: AuthorizationStatus.Auth},
  });

  it('should render correctly if current film is in favorites', () => {
    fakeFilm.isFavorite = true;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListButton film={fakeFilm} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText(fakeFilms.length)).toBeInTheDocument();
    expect(screen.getByTestId('in-list')).toBeInTheDocument();
  });

  it('should render correctly if current film is not in favorites', () => {
    fakeFilm.isFavorite = false;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListButton film={fakeFilm} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText(fakeFilms.length)).toBeInTheDocument();
    expect(screen.getByTestId('add')).toBeInTheDocument();
  });

  it('should add film to favorites when button clicked', async () => {
    fakeFilm.isFavorite = false;

    mockAPI
      .onPost(`${APIRoute.FavoriteFilms}/${fakeFilm.id}/1`)
      .reply(200, fakeFilm);

    mockAPI
      .onGet(APIRoute.FavoriteFilms)
      .reply(200, fakeFilms);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListButton film={fakeFilm} />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('link'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(addFavoriteFilmAction.fulfilled.type);
  });
  it('should remove film from favorites when button clicked', async () => {
    fakeFilm.isFavorite = true;

    mockAPI
      .onPost(`${APIRoute.FavoriteFilms}/${fakeFilm.id}/0`)
      .reply(200, fakeFilm);

    mockAPI
      .onGet(APIRoute.FavoriteFilms)
      .reply(200, fakeFilms);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListButton film={fakeFilm} />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('link'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(removeFavoriteFilmAction.fulfilled.type);
  });
});
