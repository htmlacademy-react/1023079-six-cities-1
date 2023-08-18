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
