import { Link, useNavigate } from 'react-router-dom';
import { getRating } from '../../utils';
import { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatusForOffer, loadFavoriteOffers } from '../../store/api-actions';
import { AppRoutes, AuthorizationsStatus, NameSpace } from '../../consts';
import { changeIsInLocalFavorites } from '../../store/data-process/data-process.slice';

type CardProps = {
  price: number;
  id: number;
  img: string;
  type: string;
  title: string;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  rating: number;
  isFavorite: boolean;
  isPremium: boolean;
};

function Card({
  price,
  rating,
  img,
  type,
  title,
  id,
  isFavorite,
  onMouseOver,
  onMouseLeave,
  isPremium
}: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector((state) => state[NameSpace.User].authorizationStatus);
  const localFavorites = useAppSelector((state) => state[NameSpace.Data].localStorageFavorites);
  const [isFavoriteChecked, setIsFavoriteChecked] = useState(isFavorite);
  const offers = useAppSelector((state) => state[NameSpace.Data].offersForCurrentCity);

  const bookmarkClickHandler = () => {
    if(status === AuthorizationsStatus.Auth) {
      const isFavoriteStatus = isFavoriteChecked ? 0 : 1;
      dispatch(changeFavoriteStatusForOffer({id, status: isFavoriteStatus}))
        .then(() => {
          setIsFavoriteChecked((prevState) => !prevState);
          dispatch(loadFavoriteOffers());
          const offerToAdd = offers.find((offer) => offer.id === id);
          if(offerToAdd) {
            dispatch(changeIsInLocalFavorites(offerToAdd));
          }
        });
    } else {
      navigate(AppRoutes.Login);
    }
  };

  const isInLocalFavorites = localFavorites.some((offer) => offer.id === id);
  const bookmarkClassName = isFavoriteChecked || isInLocalFavorites ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <article
      className="cities__card place-card"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <img
          className="place-card__image"
          src={img}
          width="260"
          height="200"
          alt="Place image"
        />
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={bookmarkClassName}
            type="button"
            onClick={() => void bookmarkClickHandler()}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={getRating(rating)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link onClick={scrollToTop} to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default memo(Card);
