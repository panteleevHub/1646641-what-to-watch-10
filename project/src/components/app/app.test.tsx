import {configureMockStore} from '@jedmao/redux-mock-store';
import {render,screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import React from 'react';
import {Provider} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import {createFakeFilm, createFakeFilms, createFakeReviews} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import {createAppRoute} from '../../utils/utils';

const mockStore = configureMockStore();

const fakeFilm = createFakeFilm();
const fakeFilms = createFakeFilms();
const fakeReviews = createFakeReviews();

const store = mockStore({
  DATA: {
    films: fakeFilms,
    promoFilm: fakeFilm,
    favoriteFilms: fakeFilms,
    filmData: {
      film: fakeFilm,
      similarFilms: fakeFilms,
      reviews: fakeReviews,
    },
    isDataLoading: false,
    isDataLoadingError: false
  },
  FILTER: {genre: 'Drama'},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

jest.mock('../../components/catalog/catalog', () => {
  const mockCatalog = () => <p>This is mock Catalog</p>;

  return {
    __esModule: true,
    default: mockCatalog,
  };
});

jest.mock('../../components/film-tabs/film-tabs', () => {
  const mockFilmTabs = () => <p>This is mock FilmTabs</p>;

  return {
    __esModule: true,
    default: mockFilmTabs,
  };
});

jest.mock('../../components/film-cards/film-cards', () => {
  const mockFilmCards = () => <p>This is mock FilmCards</p>;

  return {
    __esModule: true,
    default: mockFilmCards,
  };
});

describe('Application Routing', () => {

  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation(() => jest.fn());
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getAllByAltText(fakeFilm.name)).toHaveLength(2);
    expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.released)).toBeInTheDocument();

    expect(screen.getByText(/This is mock Catalog/i)).toBeInTheDocument();
  });

  it('should render "SignInScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "FilmScreen" when user navigate to "/films/:id"', () => {
    history.push(createAppRoute(AppRoute.Film, fakeFilm.id));

    render(fakeApp);

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getAllByAltText(fakeFilm.name)).toHaveLength(2);
    expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.released)).toBeInTheDocument();

    expect(screen.getByText(/This is mock FilmTabs/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock FilmCards/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go back to the main page')).toBeInTheDocument();
  });

  it('should render "PlayerScreen" when user navigate to "/player/:id"', () => {
    history.push(createAppRoute(AppRoute.Player, fakeFilm.id));

    render(fakeApp);

    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getByText('Toggler')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('Transpotting')).toBeInTheDocument();
    expect(screen.getByText('Full screen')).toBeInTheDocument();
  });
});
