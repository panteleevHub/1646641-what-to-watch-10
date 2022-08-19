import {NameSpace} from '../../const';
import {State} from '../../types/state';

const getCurrentGenre = (state: State): string => state[NameSpace.Filter].genre;

export {getCurrentGenre};
