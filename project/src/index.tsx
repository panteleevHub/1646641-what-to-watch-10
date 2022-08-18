import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {fetchFavoriteFilms, fetchFilms, fetchPromoFilm} from './services/api-actions';
import {store} from './store';

store.dispatch(fetchFilms());
store.dispatch(fetchPromoFilm());
store.dispatch(fetchFavoriteFilms());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
