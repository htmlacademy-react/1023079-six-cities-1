import { OfferType } from './mocks/offers';
import { store } from './store';

export const getOfferOnPage = (id: number): OfferType => {
  const offers = store.getState().allOffers;
  const offerOnPage = offers.find((offer) => offer.id === id);
  if (offerOnPage) {
    return offerOnPage;
  } else {
    throw new Error();
  }
};

export const getOffersInNeighbourhood = (offers: OfferType[], id: number) =>
  offers.filter((offer) => offer.id !== id).slice(0, 3);

export const getRating = (rating: number) => {
  switch(true) {
    case rating < 1:
      return { width: '0%' };
    case rating < 2:
      return { width: '20%' };
    case rating < 3:
      return { width: '40%' };
    case rating < 4:
      return { width: '60%' };
    case rating < 5:
      return { width: '80%' };
    default:
      return { width: '100%' };
  }
};
