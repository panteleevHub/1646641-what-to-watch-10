import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {
  addFavoriteFilmAction,
  addReviewAction,
  fetchFavoriteFilmsAction,
  fetchFilmAction,
  fetchFilmReviewsAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchSimilarFilmsAction,
  removeFavoriteFilmAction,
} from '../../services/api-actions';
import {Film} from '../../types/film';
import {AppData} from '../../types/state';

const initialState: AppData = {
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
};

const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchFilmAction.fulfilled, ({filmData}, action) => {
        filmData.film = action.payload as Film;
      })
      .addCase(fetchFilmReviewsAction.fulfilled, ({filmData}, action) => {
        filmData.reviews = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, ({filmData}, action) => {
        filmData.similarFilms = action.payload;
      })
      .addCase(addReviewAction.pending, (state) => {
        state.isReviewSending = true;
      })
      .addCase(addReviewAction.fulfilled, (state) => {
        state.isReviewSending = false;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.isReviewSending = false;
      })
      .addCase(addFavoriteFilmAction.fulfilled, (state, action) => {
        if (action.payload.id === state.promoFilm.id) {
          state.promoFilm = action.payload;
          state.filmData.film = action.payload;
          return;
        }
        state.filmData.film = action.payload;
      })
      .addCase(removeFavoriteFilmAction.fulfilled, (state, action) => {
        if (action.payload.id === state.promoFilm.id) {
          state.promoFilm = action.payload;
          state.filmData.film = action.payload;
          return;
        }
        state.filmData.film = action.payload;
      });
  },
});

export {appData};
