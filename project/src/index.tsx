import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {films, promoFilm} from './mocks/films';
import {reviews} from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      films={films}
      promoFilm={promoFilm}
      reviews={reviews}
    />
  </React.StrictMode>,
);
