import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, AppRoute} from '../const';
import {Film, Films} from '../types/film';
import {AppDispatch, State} from '../types/state';
import {
  redirectToRoute,
  // setReviewSendingStatus,
} from '../store/action';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken} from './token';
import {NewReview, Reviews} from '../types/review';
import {createAPIRoute, createAppRoute} from '../utils';

const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilmsAction',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);
    return data;
  }
);

const fetchFavoriteFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteFilmsAction',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.FavoriteFilms);
    return data;
  }
);

const fetchFilmAction = createAsyncThunk<void | Film, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilmAction',
  async (filmId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film>(createAPIRoute(APIRoute.Film, filmId));
      return data;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

const fetchFilmReviewsAction = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilmReviewsAction',
  async (filmId, {extra: api}) => {
    const {data} = await api.get<Reviews>(createAPIRoute(APIRoute.Reviews, filmId));
    return data;
  }
);

const addReviewAction = createAsyncThunk<void, NewReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addReviewAction',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    await api.post(createAPIRoute(APIRoute.Reviews, filmId), {comment, rating});
    dispatch(redirectToRoute(createAppRoute(AppRoute.Film, filmId)));
  }
);

const fetchSimilarFilmsAction = createAsyncThunk<Films, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarFilmsAction',
  async (filmId, {extra: api}) => {
    const {data} = await api.get<Films>(createAPIRoute(APIRoute.SimilarFilms, filmId));
    return data;
  }
);

const fetchPromoFilmAction = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromoFilmAction',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.PromoFilm);
    return data;
  }
);

const addFavoriteFilmAction = createAsyncThunk<Film, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addFavoriteFilmAction',
  async (filmId, {extra: api}) => {
    const {data} = await api.post(`${APIRoute.FavoriteFilms}/${filmId}/1`);
    return data;
  }
);

const removeFavoriteFilmAction = createAsyncThunk<Film, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/removeFavoriteFilmAction',
  async (filmId, {extra: api}) => {
    const {data} = await api.post(`${APIRoute.FavoriteFilms}/${filmId}/0`);
    return data;
  }
);

const checkAuthAction = createAsyncThunk<string, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuthAction',
  async (_arg, {extra: api}) => {
    const {data: {avatarUrl}} = await api.get(APIRoute.Login);
    return avatarUrl;
  }
);

const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/loginAction',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token, avatarUrl}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    return avatarUrl;
  }
);

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logoutAction',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export {
  fetchFilmsAction,
  fetchFavoriteFilmsAction,
  fetchFilmAction,
  fetchFilmReviewsAction,
  addReviewAction,
  fetchSimilarFilmsAction,
  fetchPromoFilmAction,
  addFavoriteFilmAction,
  removeFavoriteFilmAction,
  checkAuthAction,
  loginAction,
  logoutAction,
};
