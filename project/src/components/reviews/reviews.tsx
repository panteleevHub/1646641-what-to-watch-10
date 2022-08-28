import {convertReleaseDate, convertDateTime} from '../../utils';
import {Review} from '../../types/review';

type ReviewsProps = {
  reviews: Review[],
}

function Reviews({reviews}: ReviewsProps): JSX.Element {
  const half = Math.round(reviews.length / 2);
  const firstReviews = reviews.slice(0, half);
  const lastReviews = reviews.slice(half, reviews.length);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {firstReviews.map((review) => (
          <div key={review.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user.name}</cite>
                <time className="review__date" dateTime={convertDateTime(review.date)}>
                  {convertReleaseDate(review.date)}
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">{String(review.rating).replace(/\./g, ',')}</div>
          </div>
        ))}
      </div>

      <div className="film-card__reviews-col">
        {lastReviews.map((review) => (
          <div key={review.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user.name}</cite>
                <time className="review__date" dateTime={convertDateTime(review.date)}>
                  {convertReleaseDate(review.date)}
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">{String(review.rating).replace(/\./g, ',')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
