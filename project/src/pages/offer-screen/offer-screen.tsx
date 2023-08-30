import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import { CommentForm } from '../../components/comment-form/comment-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { ReviewType } from '../../mocks/reviews';
import { useParams } from 'react-router-dom';
import {useState} from 'react';
import { getOfferOnPage, getOffersInNeighbourhood } from '../../utils';
import Map from '../../components/map/map';
import Card from '../../components/card/card';
import { OfferType } from '../../mocks/offers';

type OfferScreenProps = {
  reviews: ReviewType[];
}

export default function OfferScreen({reviews}: OfferScreenProps): JSX.Element {
  const [activeNeighbourhoodOfferId, setActiveNeighbourhoodOfferId] = useState(-1);
  const {id} = useParams();

  const offer: OfferType = getOfferOnPage(Number(id));
  const offersInNeighbourhood = getOffersInNeighbourhood(offer.id);

  const onMouseOverHandler = (neighbourhoodOfferId: number) => {
    setActiveNeighbourhoodOfferId(neighbourhoodOfferId);
  };

  const onMouseLeave = () => setActiveNeighbourhoodOfferId(-1);

  return (
    <div className="page">
      <Helmet><title>Offer</title></Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
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

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              <div className="property__image-wrapper">
                <img className="property__image" src="img/room.jpg" alt="Photo studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-02.jpg" alt="Photo studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-03.jpg" alt="Photo studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/studio-01.jpg" alt="Photo studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                <span>Premium</span>
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">
                    Beautiful &amp; luxurious studio at great location
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width:'80%'}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">4.8</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                    Apartment
                </li>
                <li className="property__feature property__feature--bedrooms">
                    3 Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                    Max 4 adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;120</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  <li className="property__inside-item">
                      Wi-Fi
                  </li>
                  <li className="property__inside-item">
                      Washing machine
                  </li>
                  <li className="property__inside-item">
                      Towels
                  </li>
                  <li className="property__inside-item">
                      Heating
                  </li>
                  <li className="property__inside-item">
                      Coffee machine
                  </li>
                  <li className="property__inside-item">
                      Baby seat
                  </li>
                  <li className="property__inside-item">
                      Kitchen
                  </li>
                  <li className="property__inside-item">
                      Dishwasher
                  </li>
                  <li className="property__inside-item">
                      Cabel TV
                  </li>
                  <li className="property__inside-item">
                      Fridge
                  </li>
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                      Angelina
                  </span>
                  <span className="property__user-status">
                      Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                      A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="property__text">
                      An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews}/>
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map city={offer.city} offers={offersInNeighbourhood} selectedOfferId={activeNeighbourhoodOfferId}/>
          </section>
        </section>
      </main>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {offersInNeighbourhood.map((neighbourhoodOffer) => (
              <article className="near-places__card place-card" key={neighbourhoodOffer.id}>
                <Card
                  key={neighbourhoodOffer.id}
                  id={neighbourhoodOffer.id}
                  price={neighbourhoodOffer.price}
                  img={neighbourhoodOffer.previewImage}
                  type={neighbourhoodOffer.type}
                  description={neighbourhoodOffer.description}
                  onMouseOver={() => onMouseOverHandler(neighbourhoodOffer.id)}
                  onMouseLeave={onMouseLeave}
                />
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
