import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersList } from './action';
import { OfferType } from '../mocks/offers';

type initalStateType = {
  city: string;
  offersList: OfferType[];
}

const initalState: initalStateType = {
  city: '',
  offersList: []
};

export const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offersList = action.payload;
    });
});
