import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import Genres from './genres';
import {createFakeFilms} from '../../utils/mocks';

const fakeFilms = createFakeFilms();
const mockStore = configureMockStore();

const store = mockStore({
  DATA: {films: fakeFilms},
  FILTER: {genre: 'Action'},
});

describe('Component: Details', () => {
  it('should render correctly', async () => {
    const history = createMemoryHistory();
    const handleGenreChange = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Genres onGenreChange={handleGenreChange} />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getAllByRole('listitem')[0]);

    const actions = store.getActions();

    expect(actions[0].type).toBe('FILTER/resetGenres');

    expect(handleGenreChange).toBeCalledTimes(1);
    expect(screen.getByText('All genres')).toBeInTheDocument();

    fakeFilms.forEach(({genre}) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });
});
