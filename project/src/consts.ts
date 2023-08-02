type AppRoutesType = {
  [key: string]: string;
}

type AuthorizationsType = Omit<AppRoutesType, ''>

export const AppRoutes: AppRoutesType = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Rooms: '/offer',
  Room: ':id'
} as const;

export const AuthorizationsStatus: AuthorizationsType = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN'
} as const;
