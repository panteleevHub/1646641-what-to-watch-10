import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {filterFilms} from '../../store/filter-data/selectors';
import FilmCards from '../film-cards/film-cards';
import Genres from '../genres/genres';
import ShowMoreButton from '../show-more-button/show-more-button';

const FILMS_TO_RENDER_COUNT = 8;

function Catalog(): JSX.Element {
  const filteredFilms = useAppSelector(filterFilms);

  const [renderedFilmsCount, setRenderedFilmsCount] = useState(FILMS_TO_RENDER_COUNT);

  const handleShowMoreButtonClick = () => {
    setRenderedFilmsCount(
      (prevRenderedFilms) =>
        prevRenderedFilms + Math.min(FILMS_TO_RENDER_COUNT, filteredFilms.length - prevRenderedFilms)
    );
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <Genres onGenreChange={() => setRenderedFilmsCount(FILMS_TO_RENDER_COUNT)} />
      <FilmCards films={filteredFilms.slice(0, renderedFilmsCount)} />

      <div className="catalog__more">
        {filteredFilms.length > renderedFilmsCount
        &&
        <ShowMoreButton onShowMoreButtonClick={handleShowMoreButtonClick} />}
      </div>
    </section>
  );
}

export default Catalog;
