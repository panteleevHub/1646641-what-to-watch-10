import {INITIAL_GENRE} from '../../const';
import {changeGenre, filterData, resetGenres} from './filter-data';

describe('Reducer: filter-data', () => {
  it('without additional parameters should return initial state', () => {
    expect(filterData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({genre: INITIAL_GENRE});
  });

  it('should change current genre', () => {
    const state = {genre: 'comedy'};
    expect(filterData.reducer(state, changeGenre('action')))
      .toEqual({genre: 'action'});
  });

  it('should set initial genre', () => {
    const state = {genre: 'comedy'};
    expect(filterData.reducer(state, resetGenres()))
      .toEqual({genre: INITIAL_GENRE});
  });
});
