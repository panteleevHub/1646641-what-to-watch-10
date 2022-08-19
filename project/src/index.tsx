import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {store} from './store';
import {
  checkAuthAction,
  fetchFavoriteFilmsAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
} from './services/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchPromoFilmAction());
store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchFavoriteFilmsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
);
