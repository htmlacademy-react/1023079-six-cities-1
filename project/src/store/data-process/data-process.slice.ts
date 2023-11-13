import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OfferType } from '../../mocks/offers';
import { NameSpace } from '../../consts';
import { fetchOffersAction } from '../api-actions';

type InitalStateType = {
  cityName: string;
  allOffers: OfferType[];
  offersForCurrentCity: OfferType[];
  sortType: string;
  isOffersLoading: boolean;
  error: string | null;
};

const initialState: InitalStateType = {
  cityName: 'Paris',
  allOffers: [],
  offersForCurrentCity: [],
  sortType: 'Popular',
  isOffersLoading: false,
  error: null
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    changeSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;

      switch(state.sortType) {
        case 'LowToHigh':
          state.offersForCurrentCity.sort((a, b) => a.price - b.price);
          break;

        case 'HighToLow':
          state.offersForCurrentCity.sort((a, b) => b.price - a.price);
          break;

        case 'TopRating':
          state.offersForCurrentCity.sort((a, b) => b.rating - a.rating);
          break;

        case 'Popular':
          state.offersForCurrentCity = state.allOffers.filter((offer) => offer.city.name === state.cityName);
          break;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.allOffers = action.payload;
        state.isOffersLoading = false;
      });
  },
});

export const {changeCity, changeSortType} = dataProcess.actions;
