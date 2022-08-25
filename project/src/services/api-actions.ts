import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {Film, Films} from '../types/film';
import {AppDispatch, State} from '../types/state';
import {
  setFavoriteFilms,
  setFilms,
  setPromoFilm,
  setAuthorizationStatus,
  setDataLoadingStatus,
  setUserAvatar,
  clearUserAvatar,
  setFilm,
  setFilmReviews,
  setSimilarFilms,
  redirectToRoute,
  setReviewSendingStatus,
} from '../store/action';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken} from './token';
import {NewReview, Reviews} from '../types/review';
import {createAPIRoute, createAppRoute} from '../utils';

const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilmsAction',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);
    dispatch(setFilms(data));
    dispatch(setDataLoadingStatus(false));
  }
);

const fetchFavoriteFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteFilmsAction',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.FavoriteFilms);
    dispatch(setFavoriteFilms(data));
  }
);

const fetchFilmAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilmAction',
  async (filmId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film>(createAPIRoute(APIRoute.Film, filmId));
      dispatch(setFilm(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

const fetchFilmReviewsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilmReviewsAction',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<Reviews>(createAPIRoute(APIRoute.Reviews, filmId));
    dispatch(setFilmReviews(data));
  }
);

const fetchAddReviewAction = createAsyncThunk<void, NewReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchAddReviewAction',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    try {
      dispatch(setReviewSendingStatus(true));
      await api.post(createAPIRoute(APIRoute.Reviews, filmId), {comment, rating});
      dispatch(redirectToRoute(createAppRoute(AppRoute.Film, filmId)));
      dispatch(setReviewSendingStatus(false));
    } catch {
      dispatch(setReviewSendingStatus(false));
    }
  }
);

const fetchSimilarFilmsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarFilmsAction',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(createAPIRoute(APIRoute.SimilarFilms, filmId));
    dispatch(setSimilarFilms(data));
  }
);

const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromoFilmAction',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.PromoFilm);
    dispatch(setPromoFilm(data));
    dispatch(setDataLoadingStatus(false));
  }
);

const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuthAction',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: {avatarUrl}} = await api.get(APIRoute.Login);
      dispatch(setUserAvatar(avatarUrl));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/loginAction',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token, avatarUrl}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setUserAvatar(avatarUrl));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  }
);

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logoutAction',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(clearUserAvatar());
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
);

export {
  fetchFilmsAction,
  fetchFavoriteFilmsAction,
  fetchFilmAction,
  fetchFilmReviewsAction,
  fetchAddReviewAction,
  fetchSimilarFilmsAction,
  fetchPromoFilmAction,
  checkAuthAction,
  loginAction,
  logoutAction,
};
