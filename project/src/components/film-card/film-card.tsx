import {Link} from 'react-router-dom';
import {Film} from '../../types/film';

type FilmCardProps = {
  film: Film,
  onMouseOver: (id: number) => void,
}

function FilmCard({film, onMouseOver}: FilmCardProps): JSX.Element {
  const filmPath = `/films/${film.id}`;

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => onMouseOver(film.id)}>
      <div className="small-film-card__image">
        <img src={film.previewImage} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link to={filmPath} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
