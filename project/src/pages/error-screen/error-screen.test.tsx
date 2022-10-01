import {render, screen} from '@testing-library/react';
import ErrorScreen from './error-screen';

describe('Component: ErrorScreen', () => {
  it('should render correctly', () => {

    render(
      <ErrorScreen />
    );

    const headerElement = screen.getByText('Something went wrong.');
    const paragraphElement = screen.getByText('Please check your internet connection or reload the page.');

    expect(headerElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });
});
