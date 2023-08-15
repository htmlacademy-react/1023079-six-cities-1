import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import { OfferType } from '../../mocks/offers';

type FavoriteScreenProps = {
  offers: OfferType[];
};

type CitiesType = {
  name: string;
  id: number;
}[];

export default function FavoritesScreen({
  offers,
}: FavoriteScreenProps): JSX.Element {
  const cities: CitiesType = [];
  let relevantOffers: OfferType[] = [];

  offers.forEach((offer) => {
    const cityNames: string[] = cities.map((city) => city.name);
    if (!cityNames.includes(offer.city.name)) {
      const newCity = {
        name: offer.city.name,
        id: cities.length,
      };
      cities.push(newCity);
    }
  });

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
                    <span className="header__signout">Sign out</span>
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
              {cities.map((city) => {
                relevantOffers = offers.filter(
                  (offer) => offer.city.name === city.name
                );
                return (
                  <li key={city.id} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city.name}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {relevantOffers.map((offer) => (
                        <article className="favorites__card place-card" key={offer.id}>
                          <div className="place-card__mark">
                            {offer.isPremium ? <span>Premium</span> : ''}
                          </div>
                          <div className="favorites__image-wrapper place-card__image-wrapper">
                            <a href="#">
                              <img
                                className="place-card__image"
                                src={offer.previewImage}
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
                    </div>
                  </li>
                );
              })}
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
