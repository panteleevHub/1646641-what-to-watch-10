import {
  addFavoriteFilmAction,
  addReviewAction,
  fetchFavoriteFilmsAction,
  fetchFilmAction,
  fetchFilmReviewsAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchSimilarFilmsAction,
  removeFavoriteFilmAction
} from '../../services/api-actions';
import {AppData} from '../../types/state';
import {createFakeFilm, createFakeFilms, createFakeReviews} from '../../utils/mocks';
import {appData} from './app-data';

const films = createFakeFilms();
const favoriteFilms = createFakeFilms();
const similarFilms = createFakeFilms();
const promoFilm = createFakeFilm();
const film = createFakeFilm();
const reviews = createFakeReviews();

describe('Reducer: appData', () => {
  let state: AppData;

  beforeEach(() => {
    state = {
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
      isDataLoading: false,
      isDataLoadingError: false,
      isReviewSending: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(appData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
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
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: false,
      });
  });

  it('should update films if fetchFilmsAction fulfilled', () => {
    expect(appData.reducer(state, {type: fetchFilmsAction.fulfilled.type, payload: films}))
      .toEqual({
        films,
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
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: false,
      });
  });

  it('should update isDataLoadingError to "true" if fetchFilmsAction rejected', () => {
    expect(appData.reducer(state, {type: fetchFilmsAction.rejected.type, payload: films}))
      .toEqual({
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
        isDataLoading: false,
        isDataLoadingError: true,
        isReviewSending: false,
      });
  });

  it('should update promoFilm if fetchPromoFilmAction fulfilled', () => {
    expect(appData.reducer(state, {type: fetchPromoFilmAction.fulfilled.type, payload: promoFilm}))
      .toEqual({
        films: [],
        favoriteFilms: [],
        promoFilm,
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
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: false,
      });
  });

  it('should update favoriteFilms if fetchFavoriteFilmsAction fulfilled', () => {
    expect(appData.reducer(state, {type: fetchFavoriteFilmsAction.fulfilled.type, payload: favoriteFilms}))
      .toEqual({
        films: [],
        favoriteFilms,
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
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: false,
      });
  });

  it('should update film if fetchFilmAction fulfilled', () => {
    expect(appData.reducer(state, {type: fetchFilmAction.fulfilled.type, payload: film}))
      .toEqual({
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
          film,
          reviews: [],
          similarFilms: [],
        },
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: false,
      });
  });

  it('should update filmReviews if fetchFilmReviewsAction fulfilled', () => {
    expect(appData.reducer(state, {type: fetchFilmReviewsAction.fulfilled.type, payload: reviews}))
      .toEqual({
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
            isFavorite: false
          },
          reviews,
          similarFilms: [],
        },
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: false,
      });
  });

  it('should update similarFilms if fetchSimilarFilmsAction fulfilled', () => {
    expect(appData.reducer(state, {type: fetchSimilarFilmsAction.fulfilled.type, payload: similarFilms}))
      .toEqual({
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
            isFavorite: false
          },
          reviews: [],
          similarFilms,
        },
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: false,
      });
  });

  it('should update isReviewSending to "true" if addReviewAction pending', () => {
    expect(appData.reducer(state, {type: addReviewAction.pending.type}))
      .toEqual({
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
            isFavorite: false
          },
          reviews: [],
          similarFilms: [],
        },
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: true,
      });
  });

  it('should update isReviewSending to "false" if addReviewAction fulfilled', () => {
    expect(appData.reducer(state, {type: addReviewAction.fulfilled.type}))
      .toEqual({
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
            isFavorite: false
          },
          reviews: [],
          similarFilms: [],
        },
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: false,
      });
  });

  it('should update isReviewSending to "false" if addReviewAction rejected', () => {
    expect(appData.reducer(state, {type: addReviewAction.fulfilled.type}))
      .toEqual({
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
            isFavorite: false
          },
          reviews: [],
          similarFilms: [],
        },
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: false,
      });
  });

  it('should update promoFilm and film by add to favorites if current film is promoFilm', () => {
    state = {...state, promoFilm};

    expect(appData.reducer(state, {type: addFavoriteFilmAction.fulfilled.type, payload: promoFilm}))
      .toEqual({
        films: [],
        favoriteFilms: [],
        promoFilm,
        filmData: {
          film: promoFilm,
          reviews: [],
          similarFilms: [],
        },
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: false,
      });
  });

  it('should update film by add to favorites', () => {
    state = {...state, promoFilm};

    expect(appData.reducer(state, {type: addFavoriteFilmAction.fulfilled.type, payload: film}))
      .toEqual({
        films: [],
        favoriteFilms: [],
        promoFilm,
        filmData: {
          film,
          reviews: [],
          similarFilms: [],
        },
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: false,
      });
  });

  it('should update promoFilm and film by remove from favorites if current film is promoFilm', () => {
    state = {...state, promoFilm};

    expect(appData.reducer(state, {type: removeFavoriteFilmAction.fulfilled.type, payload: promoFilm}))
      .toEqual({
        films: [],
        favoriteFilms: [],
        promoFilm,
        filmData: {
          film: promoFilm,
          reviews: [],
          similarFilms: [],
        },
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: false,
      });
  });

  it('should update film by remove from favorites', () => {
    state = {...state, promoFilm};

    expect(appData.reducer(state, {type: removeFavoriteFilmAction.fulfilled.type, payload: film}))
      .toEqual({
        films: [],
        favoriteFilms: [],
        promoFilm,
        filmData: {
          film,
          reviews: [],
          similarFilms: [],
        },
        isDataLoading: false,
        isDataLoadingError: false,
        isReviewSending: false,
      });
  });
});
