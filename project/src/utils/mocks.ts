import {datatype, date, image, name, system} from 'faker';
import {Film, Films} from '../types/film';
import {Review, Reviews} from '../types/review';

export const createFakeFilm = (): Film => ({
  id: datatype.number(),
  name: name.title(),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: datatype.string(),
  videoLink: system.filePath(),
  previewVideoLink: system.filePath(),
  description: datatype.string(),
  rating: datatype.float({min: 0, max: 10}),
  scoresCount: datatype.number(),
  director: name.findName(),
  starring: Array(3).fill(name.findName()),
  runTime: datatype.number(),
  genre: datatype.string(),
  released: datatype.number(),
  isFavorite: datatype.boolean(),
});

export const createFakeFilms = (): Films => Array.from({length: 5}, createFakeFilm);

const createFakeReview = (): Review => ({
  comment: datatype.string(),
  date: date.past().toDateString(),
  id: datatype.number(),
  rating: datatype.float(),
  user: {
    id: datatype.number(),
    name: name.findName(),
  }
});

export const createFakeReviews = (): Reviews => Array.from({length: 5}, createFakeReview);
