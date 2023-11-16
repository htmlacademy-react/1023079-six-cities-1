import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OfferType } from '../../types/state';
import { NameSpace } from '../../consts';
import { fetchOffersAction, loadFavoriteOffers } from '../api-actions';

type InitalStateType = {
  cityName: string;
  allOffers: OfferType[];
  offersForCurrentCity: OfferType[];
  sortType: string;
  isOffersLoading: boolean;
  error: string | null;
  favoriteOffers: OfferType[];
  localStorageFavorites: OfferType[];
};

const initialState: InitalStateType = {
  cityName: 'Paris',
  allOffers: [],
  offersForCurrentCity: [],
  sortType: 'Popular',
  isOffersLoading: false,
  error: null,
  favoriteOffers: [],
  localStorageFavorites: []
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
    },
    setOffersForSelectedCity: (state, action: PayloadAction<OfferType[]>) => {
      state.offersForCurrentCity = action.payload;
    },
    changeIsInLocalFavorites: (state, action: PayloadAction<OfferType>) => {
      const alreadyInLocalFavorites = state.localStorageFavorites.some((offer) => offer.id === action.payload.id);
      if(alreadyInLocalFavorites) {
        state.localStorageFavorites = state.localStorageFavorites.filter((offer) => offer.id !== action.payload.id);
      } else {
        state.localStorageFavorites.push(action.payload);
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.allOffers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(loadFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.localStorageFavorites = action.payload;
      });
  },
});

export const {changeCity, changeSortType, setOffersForSelectedCity, changeIsInLocalFavorites} = dataProcess.actions;
