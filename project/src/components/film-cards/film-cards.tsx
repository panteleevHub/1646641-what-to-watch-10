import {useState} from 'react';
import {Film} from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmCardsProps = {
  films: Film[],
}

function FilmCards({films}: FilmCardsProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(0);
  // eslint-disable-next-line no-console
  console.log(activeFilm);

  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard key={film.id} film={film} onMouseOver={(id: number) => setActiveFilm(id)} />)}
    </div>
  );
}

export default FilmCards;
