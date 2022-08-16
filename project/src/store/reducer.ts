import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, INITIAL_GENRE} from '../const';
import {Film, Films} from '../types/film';
import {Reviews} from '../types/review';
import {
  changeGenre,
  setFilms,
  setFavoriteFilms,
  resetGenres,
  setPromoFilm,
  setDataLoadingStatus,
  setAuthorizationStatus,
  setUserAvatar,
  clearUserAvatar,
  setFilm,
  setFilmReviews,
  setSimilarFilms,
  setReviewSendingStatus,
} from './action';


type InitialState = {
  genre: string,
  films: Films,
  favoriteFilms: Films,
  promoFilm: Film,
  filmData: {
    film: Film,
    reviews: Reviews,
    similarFilms: Films,
  },
  isDataLoading: boolean,
  isReviewSending: boolean,
  authorizationStatus: string,
  userAvatar: string,
};

const initialState: InitialState = {
  genre: INITIAL_GENRE,
  films: [],
  favoriteFilms: [],
  promoFilm: {
    id: 0,
    name: '',
    posterImage: '',
    previewImage: '',
    backgroundImage: '',
    backgroundColor: '',
    videoLink: '',
    previewVideoLink: '',
    description: '',
    rating: 0,
    scoresCount: 0,
    director: '',
    starring: [],
    runTime: 0,
    genre: '',
    released: 0,
    isFavorite: false
  },
  filmData: {
    film: {
      id: 0,
      name: '',
      posterImage: '',
      previewImage: '',
      backgroundImage: '',
      backgroundColor: '',
      videoLink: '',
      previewVideoLink: '',
      description: '',
      rating: 0,
      scoresCount: 0,
      director: '',
      starring: [],
      runTime: 0,
      genre: '',
      released: 0,
      isFavorite: false,
    },
    reviews: [],
    similarFilms: [],
  },
  isDataLoading: true,
  isReviewSending: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userAvatar: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(resetGenres, (state) => {
      state.genre = INITIAL_GENRE;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setFilm, ({filmData}, action) => {
      filmData.film = action.payload;
    })
    .addCase(setFilmReviews, ({filmData}, action) => {
      filmData.reviews = action.payload;
    })
    .addCase(setSimilarFilms, ({filmData}, action) => {
      filmData.similarFilms = action.payload;
    })
    .addCase(setFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setReviewSendingStatus, (state, action) => {
      state.isReviewSending = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserAvatar, (state, action) => {
      state.userAvatar = action.payload;
    })
    .addCase(clearUserAvatar, (state, action) => {
      state.userAvatar = '';
    });
});

export {reducer};
