import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import Footer from './footer';

jest.mock('../../components/logo/logo', () => {
  const mockCatalog = () => <p>This is mock Logo</p>;

  return {
    __esModule: true,
    default: mockCatalog,
  };
});

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history} >
        <Footer />
      </HistoryRouter>
    );

    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock Logo/i)).toBeInTheDocument();
  });
});
