import {getRatingDescription, isCheckedAuth} from './utils';
import {AuthorizationStatus, RatingDescription} from '../const';

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
