import {NameSpace} from '../../const';
import {Film, Films} from '../../types/film';
import {Reviews} from '../../types/review';
import {State} from '../../types/state';

const getPromoFilm = (state: State): Film => state[NameSpace.Data].promoFilm;
const getFilms = (state: State): Films => state[NameSpace.Data].films;
const getFavoriteFilms = (state: State): Films => state[NameSpace.Data].favoriteFilms;
const getFilm = (state: State): Film => state[NameSpace.Data].filmData.film;
const getSimilarFilms = (state: State): Films => state[NameSpace.Data].filmData.similarFilms;
const getFilmReviews = (state: State): Reviews => state[NameSpace.Data].filmData.reviews;
const getDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isDataLoading;
const getReviewSendingStatus = (state: State): boolean => state[NameSpace.Data].isReviewSending;

export {
  getPromoFilm,
  getFilms,
  getFavoriteFilms,
  getFilm,
  getSimilarFilms,
  getFilmReviews,
  getDataLoadingStatus,
  getReviewSendingStatus,
};
