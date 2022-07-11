import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const FilmPreview = {
  Title: 'The Grand Budapest Hotel',
  Genre: 'Drama',
  ReleaseDate: 2014,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      title={FilmPreview.Title}
      genre={FilmPreview.Genre}
      releaseDate={FilmPreview.ReleaseDate}
    />
  </React.StrictMode>,
);
