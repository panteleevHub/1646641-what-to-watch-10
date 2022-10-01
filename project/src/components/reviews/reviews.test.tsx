import {render, screen} from '@testing-library/react';
import {createFakeReviews} from '../../utils/mocks';
import {convertReleaseDate} from '../../utils/utils';
import Reviews from './reviews';

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const fakeReviews = createFakeReviews();

    render(
      <Reviews reviews={fakeReviews} />
    );

    fakeReviews.forEach((review) => {
      expect(screen.getByText(review.comment)).toBeInTheDocument();
      expect(screen.getByText(review.user.name)).toBeInTheDocument();
      expect(screen.getByText(convertReleaseDate(review.date))).toBeInTheDocument();
      expect(screen.getByText(String(review.rating).replace(/\./g, ','))).toBeInTheDocument();
    });
  });
});
