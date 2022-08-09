import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../const';
import {Film, Films} from '../types/film';
import {AppDispatch, State} from '../types/state';
import {
  loadFavoriteFilms,
  loadFilms,
  loadPromoFilm,
  setDataLoadingStatus,
} from '../store/action';

const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);

    dispatch(loadFilms(data));
  }
);

const fetchFavoriteFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.FavoriteFilms);

    dispatch(loadFavoriteFilms(data));
  }
);

const fetchPromoFilm = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.PromoFilm);

    dispatch(loadPromoFilm(data));
    dispatch(setDataLoadingStatus(false));
  }
);

export {
  fetchFilms,
  fetchFavoriteFilms,
  fetchPromoFilm,
};
