import { ReviewType } from '../../mocks/reviews';
import Review from '../review/review';

type ReviewsListProps = {
  reviews: ReviewType[];
};

export default function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review}/>
      ))}
    </ul>
  );
}
