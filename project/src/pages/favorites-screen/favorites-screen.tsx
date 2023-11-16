import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import HeaderNav from '../../components/header-nav/header-nav';
import { NameSpace } from '../../consts';
import { OfferType } from '../../mocks/offers';
import { changeFavoriteStatusForOffer, loadFavoriteOffers } from '../../store/api-actions';
import { Link } from 'react-router-dom';
import { getRating } from '../../utils';

function CurrentCityOffersList({offers, cityName}: {offers: OfferType[]; cityName: string}): JSX.Element {
  const dispatch = useAppDispatch();
  const offersForCity = offers.filter((offer) => offer.city.name === cityName);

  const bookmarkClickHandler = async (id: number) => {
    await dispatch(changeFavoriteStatusForOffer({id, status: 0}));
    dispatch(loadFavoriteOffers());
  };

  return (
    <React.Fragment>
      {offersForCity.map((offer) => (
        <article className="favorites__card place-card" key={offer.id}>
          {offer.isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>}
          <div className="favorites__image-wrapper place-card__image-wrapper">
            <Link to={`/offer/${offer.id}`}>
              <img
                className="place-card__image"
                src={offer.previewImage}
                width="150"
                height="110"
                alt="Place"
              />
            </Link>
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
                onClick={() => void bookmarkClickHandler(offer.id)}
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
                <span style={getRating(offer.rating)}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <h2 className="place-card__name">
              <Link to={`/offer/${offer.id}`}>{offer.description}</Link>
            </h2>
            <p className="place-card__type">{offer.type}</p>
          </div>
        </article>
      ))}
    </React.Fragment>
  );
}

export default function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector((state) => state[NameSpace.Data].favoriteOffers);
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
                <HeaderNav />
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
                    <CurrentCityOffersList offers={offers} cityName={cityName}/>
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
