import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {APIRoute, AuthorizationStatus} from '../../const';
import {createAPI} from '../../services/api';
import HistoryRouter from '../history-router/history-router';
import {logoutAction} from '../../services/api-actions';
import UserBlock from './user-block';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

let store = mockStore({});

describe('Component: UserBlock', () => {

  beforeEach(() => {
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userAvatar: 'avatarPath',
      },
    });
  });

  it('should render correctly when authorization status is "AUTH"', () => {

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserBlock />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(/User avatar/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });

  it('should render correctly when authorization status is "NoAUTH"', () => {
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserBlock />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByAltText(/User avatar/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should dispatch logoutAction when "Sign out" button clicked', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserBlock />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Sign out/i));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(logoutAction.fulfilled.type);
  });
});
