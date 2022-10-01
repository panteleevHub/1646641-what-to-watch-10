import * as router from 'react-router';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import {createFakeFilm} from '../../utils/mocks';
import FilmCard from './film-card';
import {createAppRoute} from '../../utils/utils';
import {AppRoute} from '../../const';

const fakeFilm = createFakeFilm();
const history = createMemoryHistory();

const filmPath = createAppRoute(AppRoute.Film, fakeFilm.id);

jest.mock('../../components/video-player/video-player', () => {
  const mockVideoPlayer = () => <p>This is mock video-player</p>;

  return {
    __esModule: true,
    default: mockVideoPlayer,
  };
});

describe('Component: FilmCard', () => {

  it('should render video-player when MouseOver', async () => {
    const handleFilmCardMouseOver = jest.fn();
    const handleFilmCardMouseOut = jest.fn();

    const {rerender} = render(
      <HistoryRouter history={history}>
        <FilmCard
          film={fakeFilm}
          isPlaying={false}
          onFilmCardMouseOver={handleFilmCardMouseOver}
          onFilmCardMouseOut={handleFilmCardMouseOut}
        />
      </HistoryRouter>
    );

    await userEvent.hover(screen.getByRole('article'));

    rerender(
      <HistoryRouter history={history}>
        <FilmCard
          film={fakeFilm}
          isPlaying
          onFilmCardMouseOver={handleFilmCardMouseOver}
          onFilmCardMouseOut={handleFilmCardMouseOut}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(handleFilmCardMouseOver).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/This is mock video-player/i)).toBeInTheDocument();
  });

  it('should not render video-player when MouseOut', async () => {
    const handleFilmCardMouseOver = jest.fn();
    const handleFilmCardMouseOut = jest.fn();

    const {rerender} = render(
      <HistoryRouter history={history}>
        <FilmCard
          film={fakeFilm}
          isPlaying
          onFilmCardMouseOver={handleFilmCardMouseOver}
          onFilmCardMouseOut={handleFilmCardMouseOut}
        />
      </HistoryRouter>
    );

    await userEvent.unhover(screen.getByRole('article'));

    rerender(
      <HistoryRouter history={history}>
        <FilmCard
          film={fakeFilm}
          isPlaying={false}
          onFilmCardMouseOver={handleFilmCardMouseOver}
          onFilmCardMouseOut={handleFilmCardMouseOut}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(handleFilmCardMouseOut).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/This is mock video-player/i)).not.toBeInTheDocument();
  });

  it('should redirect to FilmScreen when MouseClick', async () => {
    const handleFilmCardMouseOver = jest.fn();
    const handleFilmCardMouseOut = jest.fn();
    const navigate = jest.fn();

    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);

    render(
      <HistoryRouter history={history}>
        <FilmCard
          film={fakeFilm}
          isPlaying={false}
          onFilmCardMouseOver={handleFilmCardMouseOver}
          onFilmCardMouseOut={handleFilmCardMouseOut}
        />
      </HistoryRouter>
    );

    await userEvent.click(screen.getByRole('article'));

    expect(navigate).toHaveBeenCalledWith(filmPath);
  });
});
