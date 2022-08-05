import {Rating, RatingDescription} from './const';

const MINS_IN_HOUR = 60;

const getRatingDescription = (rating: number): string => {
  if (rating >= Rating.None && rating < Rating.Low) {
    return RatingDescription.Bad;
  }

  if (rating >= Rating.Low && rating < Rating.Average) {
    return RatingDescription.Normal;
  }

  if (rating >= Rating.Average && rating < Rating.High) {
    return RatingDescription.Good;
  }

  if (rating >= Rating.High && rating < Rating.Max) {
    return RatingDescription.VeryGood;
  }

  return RatingDescription.Awesome;
};

const convertMinsToHours = (mins: number): string => {
  const hours = Math.trunc(mins / MINS_IN_HOUR);
  const minutes = mins % MINS_IN_HOUR;

  if (mins < MINS_IN_HOUR) {
    return `${minutes}:00`;
  }

  if (mins % MINS_IN_HOUR === 0) {
    return `${hours}:00:00`;
  }

  return `${hours}:${minutes}:00`;
};

export {
  getRatingDescription,
  convertMinsToHours,
};
