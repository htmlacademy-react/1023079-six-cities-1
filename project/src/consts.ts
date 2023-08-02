type AppRoutesType = {
  [key: string]: string;
}

export const AppRoutes: AppRoutesType = {
  Main: '/',
  Login: 'login',
  Favorites: 'favorites',
  Rooms: 'offer/',
  Room: ':id'
} as const;
