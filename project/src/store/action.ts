import {createAction} from '@reduxjs/toolkit';
import {Film, Films} from '../types/film';

const changeGenre = createAction(
  'filter/changeGenre',
  (genre: string) => ({
    payload: genre,
  })
);

const loadFilms = createAction(
  'filter/loadFilms',
  (films: Films) => ({
    payload: films,
  })
);

const loadFavoriteFilms = createAction(
  'filter/loadFavoriteFilms',
  (films: Films) => ({
    payload: films,
  })
);

const loadPromoFilm = createAction(
  'filter/loadPromoFilm',
  (film: Film) => ({
    payload: film,
  })
);

const setDataLoadingStatus = createAction(
  'filter/setDataLoadedStatus',
  (isDataLoaded: boolean) => ({
    payload: isDataLoaded,
  })
);

const resetGenres = createAction('filter/resetGenres');

export {
  changeGenre,
  loadFilms,
  loadFavoriteFilms,
  loadPromoFilm,
  setDataLoadingStatus,
  resetGenres,
};
