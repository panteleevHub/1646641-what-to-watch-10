import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import HistoryRouter from '../history-router/history-router';
import PrivateRoute from './private-route';

const history = createMemoryHistory();

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render component for public route when user not authorized', () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.SignIn}
            element={<h1>Public route</h1>}
          />
          <Route
            path='/private'
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <h1>Private route</h1>
              </PrivateRoute>
            }
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByText(/Public route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route when user authorized', () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.SignIn}
            element={<h1>Public route</h1>}
          />
          <Route
            path='/private'
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <h1>Private route</h1>
              </PrivateRoute>
            }
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByText(/Private route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public route/i)).not.toBeInTheDocument();
  });
});
