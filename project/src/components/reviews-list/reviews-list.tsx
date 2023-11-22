import { ReviewType } from '../../types/state';
import Review from '../review/review';
import { MAX_REVIEWS_COUNT } from '../../consts';

type ReviewsListProps = {
  reviews: ReviewType[] | undefined;
};

export default function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews ? reviews
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
        .map((review) => (
          <Review key={review.id} review={review}/>
        ))
        .slice(0, MAX_REVIEWS_COUNT) : null}
    </ul>
  );
}
