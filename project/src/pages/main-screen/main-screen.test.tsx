import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import {createFakeFilm} from '../../utils/mocks';
import MainScreen from './main-screen';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const fakeFilm = createFakeFilm();

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

jest.mock('../../components/catalog/catalog', () => {
  const mockCatalog = () => <p>This is mock Catalog</p>;

  return {
    __esModule: true,
    default: mockCatalog,
  };
});

jest.mock('../../components/footer/footer', () => {
  const mockFooter = () => <p>This is mock Footer</p>;

  return {
    __esModule: true,
    default: mockFooter,
  };
});

jest.mock('../../components/my-list-button/my-list-button', () => {
  const mockMyListButton = () => <p>This is mock MyListButton</p>;

  return {
    __esModule: true,
    default: mockMyListButton,
  };
});

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    const store = mockStore({
      DATA: {promoFilm: fakeFilm},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('WTW')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getAllByAltText(fakeFilm.name)).toHaveLength(2);
    expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.released)).toBeInTheDocument();

    expect(screen.getByText(/This is mock Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock UserBlock/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock Footer/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock MyListButton/i)).toBeInTheDocument();
  });
});
