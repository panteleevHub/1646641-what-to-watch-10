import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import {createFakeFilms} from '../../utils/mocks';
import MyListScreen from './my-list-screen';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const fakeFilms = createFakeFilms();

jest.mock('../../components/logo/logo', () => {
  const mockLogo = () => <p>This is mock Logo</p>;

  return {
    __esModule: true,
    default: mockLogo,
  };
});

jest.mock('../../components/user-block/user-block', () => {
  const mockUserBlock = () => <p>This is mock UserBlock</p>;

  return {
    __esModule: true,
    default: mockUserBlock,
  };
});

jest.mock('../../components/film-cards/film-cards', () => {
  const mockFilmCards = () => <p>This is mock FilmCards</p>;

  return {
    __esModule: true,
    default: mockFilmCards,
  };
});

jest.mock('../../components/footer/footer', () => {
  const mockFooter = () => <p>This is mock Footer</p>;

  return {
    __esModule: true,
    default: mockFooter,
  };
});

describe('Component: MyListScreen', () => {
  it('should render correctly', () => {
    const store = mockStore({
      DATA: {favoriteFilms: fakeFilms},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByText(fakeFilms.length)).toBeInTheDocument();

    expect(screen.getByText(/This is mock Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock UserBlock/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock Footer/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock FilmCards/i)).toBeInTheDocument();
  });
});
