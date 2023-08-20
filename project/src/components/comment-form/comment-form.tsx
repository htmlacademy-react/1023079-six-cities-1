import React from 'react';
import { STARS_DATA } from '../../consts';

export function CommentForm(): JSX.Element {

  const ratingElement = STARS_DATA.map(({value, id}) => (

    <React.Fragment key={id}>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={id}
        type="radio"
      />
      <label
        htmlFor={id}
        className="reviews__rating-label form__rating-label"
        title="perfect"
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </React.Fragment>
  ));

  return (
    <form className="reviews__form form" action="#" method="post">
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
          disabled
        >
            Submit
        </button>
      </div>
    </form>
  );
}
