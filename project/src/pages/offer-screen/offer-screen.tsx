import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import { CommentForm } from '../../components/comment-form/comment-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { ReviewType } from '../../mocks/reviews';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getOffersInNeighbourhood,
  getRating,
} from '../../utils';
import Map from '../../components/map/map';
import Card from '../../components/card/card';
import { OfferType } from '../../mocks/offers';
import { useAppSelector } from '../../hooks';
import HeaderNav from '../../components/header-nav/header-nav';
import axios from 'axios';
import { AppRoutes } from '../../consts';

type OfferScreenProps = {
  reviews: ReviewType[];
};

type StateType = {
  offer: OfferType | undefined;
  reviews: ReviewType[] | undefined;
  offersInNeighbourhood: OfferType[] | undefined;
}

export default function OfferScreen({
  reviews,
}: OfferScreenProps): JSX.Element {
  const offersInThisCity = useAppSelector(
    (state) => state.offersForCurrentCity
  );
  const [activeNeighbourhoodOfferId, setActiveNeighbourhoodOfferId] =
    useState(-1);
  const { id } = useParams();
  const navigate = useNavigate();
  const [offerData, setOfferData] = useState<StateType>({
    offer: undefined,
    reviews: [],
    offersInNeighbourhood: []
  });

  useEffect(() => {
    if(id) {
      const fetchOffer = async () => {
        try {
          const {data} = await axios.get<OfferType>(`https://12.react.pages.academy/six-cities/hotels/${id}`);
          setOfferData({...offerData, offer: data});
        } catch (error) {
          navigate(`${AppRoutes.Main}*`);
        }
      };

      fetchOffer();
    }
  }, [id]);

  const {offer} = offerData;

  if(offer) {
    const offersInNeighbourhood = getOffersInNeighbourhood(
      offersInThisCity,
      offer.id
    );

    const onMouseOverHandler = (neighbourhoodOfferId: number) => {
      setActiveNeighbourhoodOfferId(neighbourhoodOfferId);
    };

    const onMouseLeave = () => setActiveNeighbourhoodOfferId(-1);

    const getGoodsElement = () =>
      offer.goods.map((elem) => (
        <li key={elem} className="property__inside-item">
          {elem}
        </li>
      ));

    const getImgsElement = () =>
      offer.images.map((img) => (
        <div key={`${img} key`} className="property__image-wrapper">
          <img className="property__image" src={img} alt="Photo studio" />
        </div>
      ));

    return (
      <div className="page">
        <Helmet>
          <title>Offer</title>
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

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">{getImgsElement()}</div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {offer.isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{offer.title}</h1>
                  <button
                    className="property__bookmark-button button"
                    type="button"
                  >
                    <svg
                      className="property__bookmark-icon"
                      width="31"
                      height="33"
                    >
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={getRating(offer.rating)}></span>
                    <span className="visually-hidden">{offer.rating}</span>
                  </div>
                  <span className="property__rating-value rating__value">
                    {offer.rating}
                  </span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {offer.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offer.bedrooms}
                  </li>
                  <li className="property__feature property__feature--adults">
                    {offer.maxAdults}
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">{getGoodsElement()}</ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="property__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">{offer.host.name}</span>
                    {offer.host.isPro && (
                      <span className="property__user-status">Pro</span>
                    )}
                  </div>
                  <div className="property__description">
                    <p className="property__text">{offer.description}</p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews &middot;{' '}
                    <span className="reviews__amount">{reviews.length}</span>
                  </h2>
                  <ReviewsList reviews={reviews} />
                  <CommentForm />
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map
                city={offer.city}
                selectedOfferId={activeNeighbourhoodOfferId}
              />
            </section>
          </section>
        </main>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {offersInNeighbourhood.map((neighbourhoodOffer) => (
                <article
                  className="near-places__card place-card"
                  key={neighbourhoodOffer.id}
                >
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
  } else {
    return <h1>Loading</h1>;
  }
}
