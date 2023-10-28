import { ReviewType } from '../../mocks/reviews';
import Review from '../review/review';

type ReviewsListProps = {
  reviews: ReviewType[] | undefined;
};

export default function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews ? reviews.map((review) => (
        <Review key={review.id} review={review}/>
      )) : null}
    </ul>
  );
}
