import { OFFERS, OfferType } from './mocks/offers';
import { store } from './store';

export const getOfferOnPage = (id: number): OfferType => {
  const offers = store.getState().allOffers;
  const offerOnPage = offers.find((offer) => offer.id === id);
  if(offerOnPage) {
    return offerOnPage;
  } else {
    throw new Error;
  }
};

export const getOffersInNeighbourhood = (id: number) => OFFERS.filter((offer) => offer.id !== id);

export const getRating = (rating: number) => {
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
