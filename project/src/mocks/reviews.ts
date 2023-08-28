import { MOCK_REVIEWS_COUNT } from '../consts';

export type ReviewType = {
  comment: string;
  date: string;
  id?: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
}

const REVIEW: ReviewType = {
  'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'date': 'Mon Aug 28 2023 18:30:39 GMT+0300 (Москва, стандартное время)',
  'rating': 5,
  'user': {
    'avatarUrl': 'img/avatar-max.jpg',
    'id': 1,
    'isPro': false,
    'name': 'Oliver Conner'
  }
};

export const REVIEWS: ReviewType[] = Array.from({length: MOCK_REVIEWS_COUNT}).map((_, i) => {
  const newReview = {...REVIEW};
  newReview.id = i;
  return newReview;
});
