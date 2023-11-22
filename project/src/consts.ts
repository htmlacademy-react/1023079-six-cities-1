type AppRoutesType = {
  [key: string]: string;
}

type AuthorizationsType = Omit<AppRoutesType, ''>

type StarsDataType = {
  value: string;
  id: string;
}[]

export const AppRoutes: AppRoutesType = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Room: '/offer/:id'

} as const;

export const AuthorizationsStatus: AuthorizationsType = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN'
} as const;

export const STARS_DATA: StarsDataType = [
  {
    value: '5',
    id: '5-stars'
  },
  {
    value: '4',
    id: '4-stars'
  },
  {
    value: '3',
    id: '3-stars'
  },
  {
    value: '2',
    id: '2-stars'
  },
  {
    value: '1',
    id: '1-stars'
  }
];

export const CITIES_LIST = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const SORT_VARIANTS = ['Popular', 'LowToHigh', 'HighToLow', 'TopRating'];

export const NameSpace = {
  Data: 'DATA',
  User: 'USER',
  App: 'APP'
} as const;

export const MAX_REVIEWS_COUNT = 10;

export const URLS = {
  hotels: 'https://12.react.pages.academy/six-cities/hotels/',
  comments: 'https://12.react.pages.academy/six-cities/comments/',
  nearby: '/nearby'
} as const;

export const SORT_TYPES = {
  lowToHigh: 'LowToHigh',
  highToLow: 'HighToLow',
  topRating: 'TopRating',
  popular: 'Popular'
} as const;
