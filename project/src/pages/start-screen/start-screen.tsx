import { OfferList } from '../../components/offers-list/offers-list';
import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import { OfferType } from '../../mocks/offers';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../consts';
import Map from '../../components/map/map';
import { useState } from 'react';
import { CitiesList } from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks';

type StartScreenProps = {
  offers: OfferType[];
};

export default function StartScreen({ offers }: StartScreenProps): JSX.Element {
  const [selectedOfferId, setSelectedOfferId] = useState(-1);
  const offersForCurrentCity = useAppSelector((state) => state.offersForCurrentCity);
  const currentCity = useAppSelector((state) => state.cityName);

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
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
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
              <b className="places__found">{offersForCurrentCity.length} places to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OfferList offers = {offersForCurrentCity} onOfferListItemHover = {onOfferListItemHover}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={offers[0].city} offers={offersForCurrentCity} selectedOfferId={selectedOfferId}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
