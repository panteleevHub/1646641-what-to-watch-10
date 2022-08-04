import {createReducer} from '@reduxjs/toolkit';
import {INITIAL_GENRE} from '../const';
import {films} from '../mocks/films';
import {changeGenre, getFilms, resetGenres} from './action';


const initialState = {
  genre: INITIAL_GENRE,
  films: films,
};

const filterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(resetGenres, (state) => {
      state.genre = INITIAL_GENRE;
    });
});

export {filterReducer};
