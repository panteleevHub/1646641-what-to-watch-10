import {render, screen} from '@testing-library/react';
import NotFoundScreen from './not-found-screen';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {

    render(
      <NotFoundScreen />
    );

    const headerElement = screen.getByText('404. Page not found');
    const linkElement = screen.getByText('Go back to the main page');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
