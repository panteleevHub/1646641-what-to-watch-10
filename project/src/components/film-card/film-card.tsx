import {Link, useNavigate} from 'react-router-dom';
import {Film} from '../../types/film';
import VideoPlayer from '../../components/video-player/video-player';
import {FilmPreview} from '../../const';

type FilmCardProps = {
  film: Film,
  isPlaying: boolean,
  onFilmCardMouseOver: () => void,
  onFilmCardMouseOut: () => void,
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const {film, onFilmCardMouseOver, onFilmCardMouseOut, isPlaying} = props;

  const navigate = useNavigate();

  const filmPath = `/films/${film.id}`;

  return (
    <article onClick={() => navigate(filmPath)} className="small-film-card catalog__films-card" onMouseOver={onFilmCardMouseOver} onMouseOut={onFilmCardMouseOut}>
      <div className="small-film-card__image">
        {isPlaying ?
          <VideoPlayer
            width={FilmPreview.Width}
            height={FilmPreview.Height}
            poster={film.previewImage}
            src={film.videoLink}
          /> : <img src={film.previewImage} alt={film.name} width="280" height="175" />}
      </div>
      <h3 className="small-film-card__title">
        <Link to={filmPath} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
