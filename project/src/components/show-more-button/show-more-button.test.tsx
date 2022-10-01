import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShowMoreButton from './show-more-button';

describe('Component: ShowMoreButton', () => {
  it('should render correctly', async () => {
    const handleButtonClick = jest.fn();

    render(
      <ShowMoreButton onShowMoreButtonClick={handleButtonClick} />
    );

    const buttonEement = screen.getByText(/Show more/i);

    await userEvent.click(buttonEement);

    expect(buttonEement).toBeInTheDocument();
    expect(handleButtonClick).toHaveBeenCalled();
  });
});
