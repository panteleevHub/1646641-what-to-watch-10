import {NameSpace} from '../../const';
import {State} from '../../types/state';

const getAuthorizationStatus = (state: State): string => state[NameSpace.User].authorizationStatus;
const getUserAvatar = (state: State): string => state[NameSpace.User].userAvatar;

export{getAuthorizationStatus, getUserAvatar};
