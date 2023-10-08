import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatchType } from '../types/state';
import { InitialStateType } from './reducer';
import { OfferType } from '../mocks/offers';
import { loadOffers } from './action';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: InitialStateType;
  extra: AxiosInstance;
}>
(
  'loadOffers',
  async(_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferType[]>('/hotels');
    dispatch(loadOffers(data));
  }
);
