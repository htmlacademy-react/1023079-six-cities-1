import {createAction} from '@reduxjs/toolkit';
import { OfferType } from '../mocks/offers';

export const changeCity = createAction('changeCity', (value: string) => (
  {
    payload: value
  }
));

export const fillOffersList = createAction('fillOffersList');

export const changeSortType = createAction('changeSortType', (value: string) => (
  {
    payload: value
  }
));

export const toggleSorts = createAction('toggleSorts');

export const loadOffers = createAction<OfferType[]>('loadOffers');

export const changeIsOffersLoadingStatus = createAction<boolean>('changeIsOffersLoadingStatus');
