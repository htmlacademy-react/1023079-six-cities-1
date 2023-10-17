import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/action';

function CurrentCityOffersList(): JSX.Element {

  const offers = useAppSelector((state) => state.offersForCurrentCity);

  return (
    <React.Fragment>
      {offers.map((offer) => (
        <article className="favorites__card place-card" key={offer.id}>
          <div className="place-card__mark">
            {offer.isPremium && <span>Premium</span>}
          </div>
          <div className="favorites__image-wrapper place-card__image-wrapper">
            <a href="#">
              <img
                className="place-card__image"
                src='img/apartment-02.jpg'
                width="150"
                height="110"
                alt="Place"
              />
            </a>
          </div>
          <div className="favorites__card-info place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">
                                &euro;{offer.price}
                </b>
                <span className="place-card__price-text">
                                      &#47;&nbsp;night
                </span>
              </div>
              <button
                className="place-card__bookmark-button place-card__bookmark-button--active button"
                type="button"
              >
                <svg
                  className="place-card__bookmark-icon"
                  width="18"
                  height="19"
                >
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">
                                      In bookmarks
                </span>
              </button>
            </div>
            <div className="place-card__rating rating">
              <div className="place-card__stars rating__stars">
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <h2 className="place-card__name">
              <a href="#">{offer.description}</a>
            </h2>
            <p className="place-card__type">{offer.type}</p>
          </div>
        </article>
      ))}
    </React.Fragment>
  );
}

export default function FavoritesScreen(): JSX.Element {

  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.allOffers);
  const offersCityNames: string[] = offers.map((offer) => offer.city.name);
  const uniqueCityNames: string[] = Array.from(new Set(offersCityNames));

  return (
    <div className="page">
      <Helmet>
        <title>Favorites</title>
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
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span onClick={() => dispatch(logoutAction())} className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {uniqueCityNames.map((cityName) => (
                <li className="favorites__locations-items" key={cityName}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{cityName}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <CurrentCityOffersList />
                  </div>
                </li>
              ))}

            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}
