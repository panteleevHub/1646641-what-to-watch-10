import {useState} from 'react';
import {Film} from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmCardsProps = {
  films: Film[],
}

function FilmCards({films}: FilmCardsProps): JSX.Element {
  const [activePlayer, setActivePlayer] = useState(-1);

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard
          key={film.id}
          film={film}
          isPlaying={film.id === activePlayer}
          onFilmCardMouseOver={() => setActivePlayer(film.id)}
          onFilmCardMouseOut={() => setActivePlayer(-1)}
        />
      ))}
    </div>
  );
}

export default FilmCards;
