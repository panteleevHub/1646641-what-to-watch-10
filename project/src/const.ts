const INITIAL_GENRE = 'All genres';

const AppRoute = {
  Main: '/',
  SignIn: '/login',
  MyList: '/mylist',
  Film: '/films/:id',
  AddReview: '/films/:id/review',
  Player: '/player/:id',
  NotFound: '*',
  CurrentPage: '#',
} as const;

const APIRoute = {
  Films: '/films',
  SimilarFilms: 'films/id/similar',
  FavoriteFilms: '/favorite',
  Film: '/films/id',
  PromoFilm: '/promo',
  Reviews: '/comments/id',
  Login: '/login',
  Logout: '/logout',
} as const;

const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;

const NameSpace = {
  Filter: 'FILTER',
  Data: 'DATA',
  User: 'USER',
} as const;

const Rating = {
  None: 0,
  Low: 3,
  Average: 5,
  High: 8,
  Max: 10,
} as const;

const RatingDescription = {
  Bad: 'Bad',
  Normal: 'Normal',
  Good: 'Good',
  VeryGood: 'Very Good',
  Awesome: 'Awesome',
} as const;

const FilmPreview = {
  Width: '280',
  Height: '175',
} as const;

const FilmInfo = {
  Overview: 'overview',
  Details: 'details',
  Reviews: 'reviews',
} as const;

export {
  INITIAL_GENRE,
  AppRoute,
  APIRoute,
  NameSpace,
  AuthorizationStatus,
  Rating,
  RatingDescription,
  FilmPreview,
  FilmInfo,
};
