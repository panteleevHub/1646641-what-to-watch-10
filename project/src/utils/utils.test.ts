import {
  convertMinsToHours,
  convertToPlaybackTime,
  getGenresList,
  getRatingDescription,
  isCheckedAuth
} from './utils';
import {AuthorizationStatus, INITIAL_GENRE, RatingDescription} from '../const';
import {createFakeFilms} from './mocks';

describe('Function: getRatingDescription', () => {
  it('should return string "Bad" when rating is from 0 to 3', () => {
    expect(getRatingDescription(2))
      .toBe(RatingDescription.Bad);
  });

  it('should return string "Normal" when rating is from 3 to 5', () => {
    expect(getRatingDescription(3))
      .toBe(RatingDescription.Normal);
  });

  it('should return string "Good" when rating is from 5 to 8', () => {
    expect(getRatingDescription(6))
      .toBe(RatingDescription.Good);
  });

  it('should return string "Very Good" when rating is from 8 to 10', () => {
    expect(getRatingDescription(9))
      .toBe(RatingDescription.VeryGood);
  });

  it('should return string "Awesome" when rating is 10', () => {
    expect(getRatingDescription(10))
      .toBe(RatingDescription.Awesome);
  });
});

describe('Function: isCheckedAuth', () => {
  it('should return "true" when authorization status is unknown', () => {
    expect(isCheckedAuth(AuthorizationStatus.Unknown))
      .toBe(true);
  });

  it('should return "false" when authorization status is known', () => {
    expect(isCheckedAuth(AuthorizationStatus.Auth))
      .toBe(false);
  });
});

describe('Function: convertMinsToHours', () => {
  it('should return string "(mins)m" if mins < 60', () => {
    expect(convertMinsToHours(40)).toBe('40m');
    expect(convertMinsToHours(19)).toBe('19m');
    expect(convertMinsToHours(0)).toBe('0m');
  });

  it('should return string "(hours)h" if mins % 60 === 0', () => {
    expect(convertMinsToHours(60)).toBe('1h');
    expect(convertMinsToHours(120)).toBe('2h');
    expect(convertMinsToHours(180)).toBe('3h');
  });

  it('should return string "(hours)h(mins)m" if (mins > 60) && (mins % 60 !== 0)', () => {
    expect(convertMinsToHours(62)).toBe('1h 2m');
    expect(convertMinsToHours(194)).toBe('3h 14m');
    expect(convertMinsToHours(85)).toBe('1h 25m');
  });
});

describe('Function: convertToPlaybackTime', () => {
  it('should return remaining time in format "-HH:mm:ss" if remaining time more or equal to 60 min', () => {
    expect(convertToPlaybackTime(4800, 1200)).toBe('-01:00:00');
    expect(convertToPlaybackTime(13510, 4500)).toBe('-02:30:10');
  });

  it('should return remaining time in format "-mm:ss" if remaining time less than 60 min', () => {
    expect(convertToPlaybackTime(4000, 460)).toBe('-59:00');
    expect(convertToPlaybackTime(8625, 7205)).toBe('-23:40');
  });
});

describe('Function: getGenresList', () => {
  it('should return list of genres', () => {
    const fakeFilms = createFakeFilms();

    const genres = [];
    genres.push(INITIAL_GENRE);

    fakeFilms.forEach(({genre}) => genres.push(genre));

    expect(getGenresList(fakeFilms)).toEqual(genres);
  });
});
