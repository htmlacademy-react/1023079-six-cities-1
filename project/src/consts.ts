type AppRoutesType = {
  [key: string]: string;
}

type AuthorizationsType = Omit<AppRoutesType, ''>

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
