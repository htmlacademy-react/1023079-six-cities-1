import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import { CommentForm } from '../../components/comment-form/comment-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { ReviewType } from '../../mocks/reviews';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRating} from '../../utils';
import Map from '../../components/map/map';
import Card from '../../components/card/card';
import { OfferType } from '../../mocks/offers';
import HeaderNav from '../../components/header-nav/header-nav';
import { AppRoutes, AuthorizationsStatus } from '../../consts';
import { useAppSelector } from '../../hooks';
import { api } from '../../store';
import { CommentData } from '../../types/state';

type StateType = {
  offer: OfferType | undefined;
  reviews: ReviewType[] | undefined;
  offersInNeighbourhood: OfferType[] | undefined;
}

export default function OfferScreen(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const status = useAppSelector((state) => state.USER.authorizationStatus);

  const [offerData, setOfferData] = useState<StateType>({
    offer: undefined,
    reviews: [],
    offersInNeighbourhood: []
  });

  useEffect(() => {
    if(id) {
      const fetchOffer = async () => {
        try {
          const {data} = await api.get<OfferType>(`https://12.react.pages.academy/six-cities/hotels/${id}`);
          setOfferData((prevData) => ({...prevData, offer: data}));
        } catch (error) {
          navigate(`${AppRoutes.Main}*`);
        }
      };

      const fetchNeighbourhood = async () => {
        const {data} = await api.get<OfferType[]>(`https://12.react.pages.academy/six-cities/hotels/${id}/nearby`);
        setOfferData((prevData) => ({...prevData, offersInNeighbourhood: data}));
      };

      const fetchReviews = async () => {
        const {data} = await api.get<ReviewType[]>(`https://12.react.pages.academy/six-cities/comments/${id}`);
        setOfferData((prevData) => ({...prevData, reviews: data}));
      };

      fetchOffer();
      fetchNeighbourhood();
      fetchReviews();
    }
  }, [id]);

  const {offer, offersInNeighbourhood, reviews} = offerData;

  const handlNewReviewAdded = async (commentData: CommentData, testId: string) => {
    const {data} = await api.post<ReviewType[]>(`https://12.react.pages.academy/six-cities/comments/${testId}`, commentData);
    setOfferData((prevData) => ({...prevData, reviews: data}));
  };

  if(offer) {
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
                    <span className="reviews__amount">{reviews?.length ?? 0}</span>
                  </h2>
                  <ReviewsList reviews={reviews} />
                  {status === AuthorizationsStatus.Auth && <CommentForm offerId={id} handlNewReviewAdded={handlNewReviewAdded}/>}
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map
                offersInNeighbourhood={offersInNeighbourhood}
                currentOffer={offer}
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
              {offersInNeighbourhood ? offersInNeighbourhood.slice(0, 3).map((neighbourhoodOffer) => (
                <article
                  className="near-places__card place-card"
                  key={neighbourhoodOffer.id}
                >
                  <Card
                    rating={neighbourhoodOffer.rating}
                    key={neighbourhoodOffer.id}
                    id={neighbourhoodOffer.id}
                    price={neighbourhoodOffer.price}
                    img={neighbourhoodOffer.previewImage}
                    type={neighbourhoodOffer.type}
                    description={neighbourhoodOffer.description}
                  />
                </article>
              )) : null}
            </div>
          </section>
        </div>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
}
