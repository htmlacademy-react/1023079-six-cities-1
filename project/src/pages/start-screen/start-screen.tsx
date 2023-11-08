import OfferList from '../../components/offers-list/offers-list';
import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map';
import HeaderNav from '../../components/header-nav/header-nav';
import CitiesList from '../../components/cities-list/cities-list';
import OfferListHeader from '../../components/offer-list-header/offer-list-header';
import { memo } from 'react';
import Sorts from '../../components/sorts/sorts';

function StartScreen(): JSX.Element {
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
                <HeaderNav />
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
              <OfferListHeader />
              <Sorts />
              <div className="cities__places-list places__list tabs__content">
                <OfferList />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default memo(StartScreen);
