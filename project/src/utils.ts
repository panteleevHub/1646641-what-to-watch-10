import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {AuthorizationStatus, INITIAL_GENRE, Rating, RatingDescription} from './const';
import {Film} from './types/film';

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
    return `${minutes}m`;
  }

  if (mins % MINS_IN_HOUR === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};

const convertToPlaybackTime = (runTime: number) => {
  dayjs.extend(duration);

  if (runTime < MINS_IN_HOUR) {
    return dayjs.duration(runTime, 'minutes').format('mm:ss');
  }

  return dayjs.duration(runTime, 'minutes').format('HH:mm:ss');
};

const getGenresList = (films: Film[]): string[] => {
  const genres: Set<string> = new Set();
  genres.add(INITIAL_GENRE);

  films.forEach(({genre}) => genres.add(genre));

  return [...genres];
};

const isCheckedAuth = (authorizationStatus: string): boolean => authorizationStatus === AuthorizationStatus.Unknown;

const createAPIRoute = (route: string, id: number) => route.replace('id', `${id}`);
const createAppRoute = (route: string, id: number) => route.replace(':id', `${id}`);

export {
  getRatingDescription,
  convertMinsToHours,
  convertToPlaybackTime,
  getGenresList,
  isCheckedAuth,
  createAPIRoute,
  createAppRoute,
};
