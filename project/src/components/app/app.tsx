import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes, AuthorizationsStatus } from '../../consts';
import StartScreen from '../../pages/start-screen/start-screen';
import NotFound from '../../pages/not-found-screen/not-found-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { OfferType } from '../../mocks/offers';

type AppProps = {
  offers: OfferType[];
};

function App({ offers }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.Main}>
            <Route index element={<StartScreen offers={offers} />} />
            <Route
              path={AppRoutes.Favorites}
              element={
                <PrivateRoute authorizationStatus={AuthorizationsStatus.Auth}>
                  <FavoritesScreen offers={offers}/>
                </PrivateRoute>
              }
            />
            <Route path={AppRoutes.Login} element={<LoginScreen />} />
            <Route path={AppRoutes.Room} element={<OfferScreen />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
