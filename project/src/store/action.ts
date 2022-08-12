import {createAction} from '@reduxjs/toolkit';
import {Film, Films} from '../types/film';

const changeGenre = createAction(
  'filter/changeGenre',
  (genre: string) => ({
    payload: genre,
  })
);

const resetGenres = createAction('filter/resetGenres');

const setFilms = createAction(
  'data/setFilms',
  (films: Films) => ({
    payload: films,
  })
);

const setFavoriteFilms = createAction(
  'data/setFavoriteFilms',
  (films: Films) => ({
    payload: films,
  })
);

const setPromoFilm = createAction(
  'data/setPromoFilm',
  (film: Film) => ({
    payload: film,
  })
);

const setDataLoadingStatus = createAction(
  'data/setDataLoadingStatus',
  (isDataLoaded: boolean) => ({
    payload: isDataLoaded,
  })
);

const setAuthorizationStatus = createAction(
  'user/setAuthorizationStatus',
  (status: string) => ({
    payload: status,
  })
);

const setUserAvatar = createAction(
  'user/setUserAvatar',
  (avatar: string) => ({
    payload: avatar,
  })
);

export {
  changeGenre,
  resetGenres,
  setFilms,
  setFavoriteFilms,
  setPromoFilm,
  setDataLoadingStatus,
  setAuthorizationStatus,
  setUserAvatar,
};
