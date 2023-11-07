import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersList, changeSortType, toggleSorts, setOffers, changeIsOffersLoadingStatus, requireAuthorization, setError, setStatusNoAuthAction, setSelectedOfferId } from './action';
import { OfferType } from '../mocks/offers';
import { AuthorizationsStatus } from '../consts';

export type InitialStateType = {
  cityName: string;
  allOffers: OfferType[];
  offersForCurrentCity: OfferType[];
  sortType: string;
  isSortsOpen: boolean;
  isOffersLoading: boolean;
  authorizationStatus: string;
  error: string | null;
  selectedOfferId: number;
}

const initalState: InitialStateType = {
  authorizationStatus: AuthorizationsStatus.Unknown,
  sortType: 'Popular',
  cityName: 'Paris',
  allOffers: [],
  offersForCurrentCity: [],
  isSortsOpen: false,
  isOffersLoading: true,
  error: null,
  selectedOfferId: -1
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setStatusNoAuthAction, (state) => {
      state.authorizationStatus = AuthorizationsStatus.NoAuth;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setSelectedOfferId, (state, action) => {
      state.selectedOfferId = action.payload;
    });
});
