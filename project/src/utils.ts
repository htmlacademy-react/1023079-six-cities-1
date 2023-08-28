import { OFFERS, OfferType } from './mocks/offers';

export const getOfferOnPage = (id: number): OfferType => OFFERS.find((offer) => offer.id === id) as OfferType;
export const getOffersInNeighbourhood = (id: number) => OFFERS.filter((offer) => offer.id !== id);
