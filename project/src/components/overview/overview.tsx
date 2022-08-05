import {Fragment} from 'react';
import {Film} from '../../types/film';
import {getRatingDescription} from '../../utils';

type OverviewProps = {
  film: Film,
}

function Overview({film}: OverviewProps): JSX.Element {
  return (
    <Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{String(film.rating).replace(/\./g, ',')}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingDescription(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {film.starring.join(', ')} and other</strong></p>
      </div>
    </Fragment>
  );
}

export default Overview;
