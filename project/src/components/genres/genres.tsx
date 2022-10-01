import {Link} from 'react-router-dom';
import {AppRoute, INITIAL_GENRE} from '../../const';
import {getGenresList} from '../../utils/utils';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCurrentGenre} from '../../store/filter-data/selectors';
import {changeGenre, resetGenres} from '../../store/filter-data/filter-data';
import {getFilms} from '../../store/app-data/selectors';

type GenresProps = {
  onGenreChange: () => void,
}

function Genres({onGenreChange}: GenresProps): JSX.Element {
  const films = useAppSelector(getFilms);
  const currentGenre = useAppSelector(getCurrentGenre);

  const dispatch = useAppDispatch();

  const genres = getGenresList(films);

  const handleGenreChange = (genre: string) => {
    if (genre === INITIAL_GENRE) {
      dispatch(resetGenres());
      return;
    }

    dispatch(changeGenre(genre));
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li onClick={() => {
          handleGenreChange(genre);
          onGenreChange();
        }} key={genre} className={currentGenre !== genre ? 'catalog__genres-item' : 'catalog__genres-item catalog__genres-item--active'}
        >
          <Link to={AppRoute.CurrentPage} className="catalog__genres-link">{genre}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Genres;
