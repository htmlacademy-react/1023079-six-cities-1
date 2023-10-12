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
import { ReviewType } from '../../mocks/reviews';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type AppProps = {
  offers: OfferType[];
  reviews: ReviewType[];
};

function App({ offers, reviews }: AppProps): JSX.Element {
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);

  if(isOffersLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.Main}>
            <Route index element={<StartScreen/>} />
            <Route
              path={AppRoutes.Favorites}
              element={
                <PrivateRoute authorizationStatus={AuthorizationsStatus.Auth}>
                  <FavoritesScreen offers={offers}/>
                </PrivateRoute>
              }
            />
            <Route path={AppRoutes.Login} element={<LoginScreen />} />
            <Route path={AppRoutes.Room} element={<OfferScreen reviews={reviews}/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
