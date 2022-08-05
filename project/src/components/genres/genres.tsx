import {Link} from 'react-router-dom';
import {AppRoute, INITIAL_GENRE} from '../../const';
import {getGenresList} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeGenre, resetGenres} from '../../store/action';
import {Film} from '../../types/film';

type GenresProps = {
  films: Film[],
}

function Genres({films}: GenresProps): JSX.Element {
  const currentGenre = useAppSelector((store) => store.genre);
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
        <li onClick={() => handleGenreChange(genre)} key={genre} className={`catalog__genres-item ${currentGenre === genre && 'catalog__genres-item--active'}`}>
          <Link to={AppRoute.CurrentPage} className="catalog__genres-link">{genre}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Genres;
