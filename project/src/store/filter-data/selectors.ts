import {createSelector} from 'reselect';
import {INITIAL_GENRE, NameSpace} from '../../const';
import {State} from '../../types/state';
import {getFilms} from '../app-data/selectors';

const getCurrentGenre = (state: State): string => state[NameSpace.Filter].genre;

const filterFilms = createSelector(
  [getFilms, getCurrentGenre],
  (films, currentGenre) => {
    if (currentGenre === INITIAL_GENRE) {
      return films;
    }

    return films.filter(({genre}) => genre === currentGenre);
  }
);

export {getCurrentGenre, filterFilms};
