import {createAction} from '@reduxjs/toolkit';
import {Film, Films} from '../types/film';
import {Reviews} from '../types/review';

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

const setFilm = createAction(
  'data/setFilm',
  (film: Film) => ({
    payload: film,
  })
);

const setFilmReviews = createAction(
  'data/setFilmReviews',
  (reviews: Reviews) => ({
    payload: reviews,
  })
);

const setSimilarFilms = createAction(
  'data/setSimilarFilms',
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
  (isDataLoading: boolean) => ({
    payload: isDataLoading,
  })
);

const setReviewSendingStatus = createAction(
  'data/setReviewSendingStatus',
  (isReviewSending: boolean) => ({
    payload: isReviewSending,
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

const clearUserAvatar = createAction('user/clearUserAvatar');

const redirectToRoute = createAction(
  'route/redirectToRoute',
  (route: string) => ({
    payload: route,
  })
);

export {
  changeGenre,
  resetGenres,
  setFilms,
  setFilm,
  setFilmReviews,
  setSimilarFilms,
  setFavoriteFilms,
  setPromoFilm,
  setDataLoadingStatus,
  setReviewSendingStatus,
  setAuthorizationStatus,
  setUserAvatar,
  clearUserAvatar,
  redirectToRoute,
};
