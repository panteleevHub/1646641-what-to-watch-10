import MainScreen from '../../pages/main-screen/main-screen';

type FilmPreviewProps = {
  title: string,
  genre: string,
  releaseDate: number,
}

function App({title, genre, releaseDate}: FilmPreviewProps): JSX.Element {
  return (
    <MainScreen
      title={title}
      genre={genre}
      releaseDate={releaseDate}
    />
  );
}

export default App;
