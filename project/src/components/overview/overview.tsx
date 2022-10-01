import {Fragment} from 'react';
import {Film} from '../../types/film';
import {getRatingDescription} from '../../utils/utils';

type OverviewProps = {
  film: Film,
}

function Overview({film}: OverviewProps): JSX.Element {
  const {rating, scoresCount, description, director, starring} = film;

  return (
    <Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{String(rating).replace(/\./g, ',')}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingDescription(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')} and other</strong></p>
      </div>
    </Fragment>
  );
}

export default Overview;
