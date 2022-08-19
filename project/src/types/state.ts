import {store} from '../store/index.js';
import {Film, Films} from './film.js';
import {Reviews} from './review.js';

export type UserProcess = {
  authorizationStatus: string,
  userAvatar: string,
};

export type AppData = {
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
}

export type FilterData = {
  genre: string,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
