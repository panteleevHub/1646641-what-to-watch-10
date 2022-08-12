import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, AuthorizationStatus} from '../const';
import {Film, Films} from '../types/film';
import {AppDispatch, State} from '../types/state';
import {
  setFavoriteFilms,
  setFilms,
  setPromoFilm,
  setAuthorizationStatus,
  setDataLoadingStatus,
  setUserAvatar,
} from '../store/action';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken} from './token';

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

const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromoFilmAction',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.PromoFilm);

    dispatch(setPromoFilm(data));
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
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
);

export {
  fetchFilmsAction,
  fetchFavoriteFilmsAction,
  fetchPromoFilmAction,
  checkAuthAction,
  loginAction,
  logoutAction,
};
