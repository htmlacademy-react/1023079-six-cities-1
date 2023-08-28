import { ReviewType } from '../../mocks/reviews';

type ReviewProps = {
  review: ReviewType;
}

const getRating = (rating: number) => {
  switch(rating) {
    case 1:
      return {width: '20%'};
    case 2:
      return {width: '40%'};
    case 3:
      return {width: '60%'};
    case 4:
      return {width: '80%'};
    case 5:
      return {width: '100%'};
  }
};

export default function Review({review}: ReviewProps): JSX.Element {

  const dateString = review.date;
  const dateObject = new Date(dateString);
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
        <time className="reviews__time" dateTime="2019-04-24">
          {month} {year}
        </time>
      </div>
    </li>
  );
}
