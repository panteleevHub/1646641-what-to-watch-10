import {AuthorizationStatus} from '../../const';
import {checkAuthAction, loginAction, logoutAction} from '../../services/api-actions';
import {UserProcess} from '../../types/state';
import {userProcess} from './user-process';

describe('Reducer: userProcess', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userAvatar: '',
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown, userAvatar: ''});
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.fulfilled.type, payload: 'avatarPath'}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, userAvatar: 'avatarPath'});
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userAvatar: ''});
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: loginAction.fulfilled.type, payload: 'avatarPath'}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, userAvatar: 'avatarPath'});
    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, {type: loginAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userAvatar: ''});
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userAvatar: ''});
    });
  });
});
