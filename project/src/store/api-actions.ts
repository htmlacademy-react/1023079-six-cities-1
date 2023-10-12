import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatchType } from '../types/state';
import { OfferType } from '../mocks/offers';
import { changeIsOffersLoadingStatus, fillOffersList, setOffers } from './action';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>
(
  'loadOffers',
  async(_arg, {dispatch, extra: api}) => {
    dispatch(changeIsOffersLoadingStatus(true));
    const {data} = await api.get<OfferType[]>('/hotels');
    dispatch(setOffers(data));
    dispatch(fillOffersList());
    dispatch(changeIsOffersLoadingStatus(false));
  }
);
