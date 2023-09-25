import {createAction} from '@reduxjs/toolkit';

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
