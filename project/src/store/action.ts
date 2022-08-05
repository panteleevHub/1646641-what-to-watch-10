import {createAction} from '@reduxjs/toolkit';
import {Film} from '../types/film';

const changeGenre = createAction(
  'filter/changeGenre',
  (genre: string) => ({
    payload: genre,
  })
);

const getFilms = createAction(
  'filter/getFilms',
  (films: Film[]) => ({
    payload: films,
  })
);

const resetGenres = createAction('filter/resetGenres');

export {
  changeGenre,
  getFilms,
  resetGenres,
};
