import {MouseEvent} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  addFavoriteFilmAction,
  fetchFavoriteFilmsAction,
  removeFavoriteFilmAction
} from '../../services/api-actions';
import {getFavoriteFilms} from '../../store/app-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {Film} from '../../types/film';

type MyListButtonProps = {
  film: Film
}

function MyListButton({film}: MyListButtonProps): JSX.Element {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      return navigate(AppRoute.SignIn);
    }

    if (!film.isFavorite) {
      dispatch(addFavoriteFilmAction(film.id));
      dispatch(fetchFavoriteFilmsAction());
      return;
    }

    dispatch(removeFavoriteFilmAction(film.id));
    dispatch(fetchFavoriteFilmsAction());
  };

  return (
    <Link onClick={handleButtonClick} to={AppRoute.CurrentPage} className="btn btn--list film-card__button" type="button">
      {film.isFavorite
        ?
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
        :
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>}
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </Link>
  );
}

export default MyListButton;
