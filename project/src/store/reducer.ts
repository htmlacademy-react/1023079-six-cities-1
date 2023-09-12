import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersList } from './action';
import { OFFERS, OfferType } from '../mocks/offers';

type initialStateType = {
  cityName: string;
  allOffers: OfferType[];
  offersForCurrentCity: OfferType[];
}

const initalState: initialStateType = {
  cityName: 'Paris',
  allOffers: OFFERS,
  offersForCurrentCity: []
};

export const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(fillOffersList, (state) => {
      state.offersForCurrentCity = state.allOffers.filter((offer) => offer.city.name === state.cityName);
    });
});
