import {createAction} from '@reduxjs/toolkit';
import { OfferType } from '../mocks/offers';

export const changeCity = createAction('changeCity', (value: string) => (
  {
    payload: value
  }
));

export const fillOffersList = createAction('fillOffersList', (value: OfferType[]) => (
  {
    payload: value
  }
));
