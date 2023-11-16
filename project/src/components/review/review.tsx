import { ReviewType } from '../../types/state';
import { getRating } from '../../utils';

type ReviewProps = {
  review: ReviewType;
}

export default function Review({review}: ReviewProps): JSX.Element {

  const dateObject = new Date(review.date);
  const month = new Intl.DateTimeFormat('en-EN', { month: 'long' }).format(dateObject);
  const year = dateObject.getFullYear();

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={getRating(review.rating)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time">
          {month} {year}
        </time>
      </div>
    </li>
  );
}
