import { OfferList } from '../../components/offers-list/offers-list';
import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoutes, AuthorizationsStatus } from '../../consts';
import Map from '../../components/map/map';
import { useState } from 'react';
import { CitiesList } from '../../components/cities-list/cities-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import SortVarients from '../../components/sort-variants/sort-varients';
import { logoutAction, toggleSorts } from '../../store/action';

export default function StartScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.authorizationStatus);
  const currentCity = useAppSelector((state) => state.cityName);
  const offersForCurrentCity = useAppSelector(
    (state) => state.offersForCurrentCity
  );
  const [selectedOfferId, setSelectedOfferId] = useState(-1);
  const isSortsOpen = useAppSelector((state) => state.isSortsOpen);

  const onOfferListItemHover = (id: number) => {
    setSelectedOfferId(id);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six Cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  {status === AuthorizationsStatus.Auth ? (
                    <>
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoutes.Favorites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                        Oliver.conner@gmail.com
                        </span>
                        <span className="header__favorite-count">3</span>
                      </Link>
                      <a className="header__nav-link" href="#">
                        <span onClick={()=> dispatch(logoutAction())} className="header__signout">Sign out</span>
                      </a>
                    </>
                  ) : (
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoutes.Login}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <CitiesList />
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offersForCurrentCity.length} places to stay in {currentCity}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span
                  onClick={() => dispatch(toggleSorts())}
                  className="places__sorting-type"
                  tabIndex={0}
                >
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                {isSortsOpen && <SortVarients />}
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OfferList
                  offers={offersForCurrentCity}
                  onOfferListItemHover={onOfferListItemHover}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={offersForCurrentCity[0].city}
                  selectedOfferId={selectedOfferId}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
