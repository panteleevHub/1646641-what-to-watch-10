import {configureStore} from '@reduxjs/toolkit';
import {filterReducer} from './reducer';
import {createAPI} from '../services/api';

const api = createAPI();

const store = configureStore({
  reducer: filterReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }),
});

export {store};
