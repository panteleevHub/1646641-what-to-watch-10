import {getDefaultNormalizer, render, screen} from '@testing-library/react';
import {createFakeFilm} from '../../utils/mocks';
import {convertMinsToHours} from '../../utils/utils';
import Details from './details';

describe('Component: Details', () => {
  it('should render correctly', () => {
    const fakeFilm = createFakeFilm();

    render(
      <Details film={fakeFilm} />
    );

    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.director)).toBeInTheDocument();

    expect(screen.getByText('Starring')).toBeInTheDocument();

    expect(
      screen.getByText(fakeFilm.starring.join(',\n'), {
        normalizer: getDefaultNormalizer({collapseWhitespace: false}),
      })
    ).toBeInTheDocument();

    expect(screen.getByText('Run Time')).toBeInTheDocument();
    expect(screen.getByText(convertMinsToHours(fakeFilm.runTime))).toBeInTheDocument();

    expect(screen.getByText('Genre')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();

    expect(screen.getByText('Released')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.released)).toBeInTheDocument();
  });
});
