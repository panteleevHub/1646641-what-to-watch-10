import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly with prop isFooterLogo', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history} >
        <Logo isFooterLogo />
      </HistoryRouter>
    );

    const linkElement = screen.getByRole('link');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('logo__link--light');

    expect(screen.getAllByText('W')).toHaveLength(2);
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('should render correctly without prop isFooterLogo', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history} >
        <Logo />
      </HistoryRouter>
    );

    const linkElement = screen.getByRole('link');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).not.toHaveClass('logo__link--light');

    expect(screen.getAllByText('W')).toHaveLength(2);
    expect(screen.getByText('T')).toBeInTheDocument();
  });
});
