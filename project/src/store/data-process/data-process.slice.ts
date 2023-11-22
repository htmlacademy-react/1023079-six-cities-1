import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OfferType } from '../../types/state';
import { NameSpace } from '../../consts';
import { fetchOffersAction, loadFavoriteOffers } from '../api-actions';
import { SORT_TYPES } from '../../consts';
import { CITIES_LIST } from '../../consts';

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
  cityName: CITIES_LIST[0],
  allOffers: [],
  offersForCurrentCity: [],
  sortType: SORT_TYPES.popular,
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
        case SORT_TYPES.lowToHigh:
          state.offersForCurrentCity.sort((a, b) => a.price - b.price);
          break;

        case SORT_TYPES.highToLow:
          state.offersForCurrentCity.sort((a, b) => b.price - a.price);
          break;

        case SORT_TYPES.topRating:
          state.offersForCurrentCity.sort((a, b) => b.rating - a.rating);
          break;

        case SORT_TYPES.popular:
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
