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

export const MOCK_OFFERS_COUNT = 4;
export const MOCK_REVIEWS_COUNT = 3;

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

export const LAT_LON_DATA = [
  {
    lat: 52.3909553943508,
    lon: 4.85309666406198
  }, {
    lat: 52.3609553943508,
    lon: 4.85309666406198
  }, {
    lat: 52.3909553943508,
    lon: 4.929309666406198
  }, {
    lat: 52.3809553943508,
    lon: 4.939309666406198
  }
];
