import {createSlice} from '@reduxjs/toolkit';
import {INITIAL_GENRE, NameSpace} from '../../const';
import {FilterData} from '../../types/state';

const initialState: FilterData = {
  genre: INITIAL_GENRE,
};

const filterData = createSlice({
  name: NameSpace.Filter,
  initialState,
  reducers: {
    changeGenre: (state, action) => {
      state.genre = action.payload;
    },
    resetGenres: (state) => {
      state.genre = INITIAL_GENRE;
    },
  },
});

const {changeGenre, resetGenres} = filterData.actions;

export {
  filterData,
  changeGenre,
  resetGenres,
};
