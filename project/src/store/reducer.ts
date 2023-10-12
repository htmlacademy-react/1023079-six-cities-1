import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersList, changeSortType, toggleSorts, setOffers, changeIsOffersLoadingStatus } from './action';
import { OfferType } from '../mocks/offers';

export type InitialStateType = {
  cityName: string;
  allOffers: OfferType[];
  offersForCurrentCity: OfferType[];
  sortType: string;
  isSortsOpen: boolean;
  isOffersLoading: boolean;
}

const initalState: InitialStateType = {
  sortType: 'Popular',
  cityName: 'Paris',
  allOffers: [],
  offersForCurrentCity: [],
  isSortsOpen: false,
  isOffersLoading: true
};

export const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(fillOffersList, (state) => {
      state.offersForCurrentCity = state.allOffers.filter((offer) => offer.city.name === state.cityName);
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;

      switch(state.sortType) {
        case 'LowToHigh':
          state.offersForCurrentCity.sort((a, b) => a.price - b.price);
          state.isSortsOpen = false;
          break;

        case 'HighToLow':
          state.offersForCurrentCity.sort((a, b) => b.price - a.price);
          state.isSortsOpen = false;
          break;

        case 'TopRating':
          state.offersForCurrentCity.sort((a, b) => b.rating - a.rating);
          state.isSortsOpen = false;
          break;

        case 'Popular':
          state.offersForCurrentCity = state.allOffers.filter((offer) => offer.city.name === state.cityName);
          state.isSortsOpen = false;
          break;
      }
    })
    .addCase(toggleSorts, (state) => {
      state.isSortsOpen = !state.isSortsOpen;
    })
    .addCase(setOffers, (state, action) => {
      state.allOffers = action.payload;
    })
    .addCase(changeIsOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});
