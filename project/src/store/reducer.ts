import {createReducer} from '@reduxjs/toolkit';
import {INITIAL_GENRE} from '../const';
import {Film, Films} from '../types/film';
import {
  changeGenre,
  loadFilms,
  loadFavoriteFilms,
  resetGenres,
  loadPromoFilm,
  setDataLoadingStatus,
} from './action';


type InitialState = {
  genre: string,
  films: Films,
  favoriteFilms: Films,
  promoFilm: Film,
  isDataLoading: boolean,
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
  isDataLoading: true,
};

const filterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(resetGenres, (state) => {
      state.genre = INITIAL_GENRE;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(loadFavoriteFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    });
});

export {filterReducer};
