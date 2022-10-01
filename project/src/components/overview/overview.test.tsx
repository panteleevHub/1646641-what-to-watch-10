import {render, screen} from '@testing-library/react';
import {createFakeFilm} from '../../utils/mocks';
import {getRatingDescription} from '../../utils/utils';
import Overview from './overview';

describe('Component: Overview', () => {
  it('should render correctly', () => {
    const fakeFilm = createFakeFilm();

    render(
      <Overview film={fakeFilm} />
    );

    const ratingScoreElement = screen.getByText(String(fakeFilm.rating).replace(/\./g, ','));
    const ratingDescriptionElement = screen.getByText(getRatingDescription(fakeFilm.rating));
    const ratingCountElement = screen.getByText(`${fakeFilm.scoresCount} ratings`);
    const filmDescriptiionElement = screen.getByText(fakeFilm.description);
    const filmDirectorElement = screen.getByText(`Director: ${fakeFilm.director}`);

    expect(ratingScoreElement).toBeInTheDocument();
    expect(ratingDescriptionElement).toBeInTheDocument();
    expect(ratingCountElement).toBeInTheDocument();
    expect(filmDescriptiionElement).toBeInTheDocument();
    expect(filmDirectorElement).toBeInTheDocument();

    expect(
      screen.getByText(`${fakeFilm.starring.join(', ')} and other`, {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});
