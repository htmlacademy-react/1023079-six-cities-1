import { Link, useNavigate } from 'react-router-dom';
import { getRating } from '../../utils';
import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatusForOffer, loadFavoriteOffers } from '../../store/api-actions';
import { AppRoutes, AuthorizationsStatus, NameSpace } from '../../consts';

type CardProps = {
  price: number;
  id: number;
  img: string;
  type: string;
  description: string;
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
  description,
  id,
  isFavorite,
  onMouseOver,
  onMouseLeave,
  isPremium
}: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector((state) => state[NameSpace.User].authorizationStatus);
  const [isFavoriteChecked, setIsFavoriteChecked] = useState(isFavorite);

  useEffect(() => {
    dispatch(loadFavoriteOffers());
  }, [isFavoriteChecked]);

  const bookmarkClickHandler = async () => {
    if(status === AuthorizationsStatus.Auth) {
      const isFavoriteStatus = isFavoriteChecked ? 0 : 1;
      const result = await dispatch(changeFavoriteStatusForOffer({id, status: isFavoriteStatus}));
      if(result.payload && typeof result.payload === 'object' && 'id' in result.payload) {
        setIsFavoriteChecked((prevState) => !prevState);
      }
    } else {
      navigate(AppRoutes.Login);
    }
  };

  const bookmarkClassName = isFavoriteChecked ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button';

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
          <Link onClick={scrollToTop} to={`/offer/${id}`}>{description}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default memo(Card);
