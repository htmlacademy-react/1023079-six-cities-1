import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../mocks/offers';
import { AxiosError } from 'axios';

export const changeCity = createAction('changeCity', (value: string) => ({
  payload: value,
}));

export const fillOffersList = createAction('fillOffersList');

export const changeSortType = createAction(
  'changeSortType',
  (value: string) => ({
    payload: value,
  })
);

export const toggleSorts = createAction('toggleSorts');

export const setOffers = createAction<OfferType[]>('setOffers');

export const changeIsOffersLoadingStatus = createAction<boolean>(
  'changeIsOffersLoadingStatus'
);

export const requireAuthorization = createAction(
  'requireAuthorization',
  (value: string) => ({
    payload: value,
  })
);

export const logoutAction = createAction('logoutAction');

export const setError = createAction('setError', (value: AxiosError) => ({
  payload: value
}));
