import React, { useState } from 'react';
import { STARS_DATA } from '../../consts';
import { CommentData } from '../../types/state';

type props = {
  offerId: string | undefined;
  handlNewReviewAdded: (commentData: CommentData, testId: string) => Promise<void>;
}

export function CommentForm({offerId, handlNewReviewAdded}: props): JSX.Element {
  const [commentData, setCommentData] = useState<CommentData>({
    rating: 0,
    comment: ''
  });

  const ratingElement = STARS_DATA.map(({value, id}) => (
    <React.Fragment key={id}>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={id}
        type="radio"
        checked={commentData.rating === +value}
      />
      <label
        htmlFor={id}
        className="reviews__rating-label form__rating-label"
        title="perfect"
        onClick={() => setCommentData((prevData) => ({...prevData, rating: +value}))}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </React.Fragment>
  ));

  const resetComment = () => {
    setCommentData({rating: 0, comment: ''});
  };

  const handleFormSubmit = (evt: React.FormEvent) => {
    if(offerId) {
      evt.preventDefault();
      handlNewReviewAdded(commentData, offerId);
      resetComment();
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratingElement}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={commentData.comment}
        onChange={(e) => setCommentData((prevData) => ({...prevData, comment: e.target.value}))}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
            with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!(commentData.comment && commentData.comment.length > 50 && commentData.rating)}
        >
            Submit
        </button>
      </div>
    </form>
  );
}
