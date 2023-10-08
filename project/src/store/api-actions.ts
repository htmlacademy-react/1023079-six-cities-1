import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatchType } from '../types/state';
import { InitialStateType } from './reducer';
import { OfferType } from '../mocks/offers';
import { changeIsOffersLoadingStatus, fillOffersList, loadOffers } from './action';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: InitialStateType;
  extra: AxiosInstance;
}>
(
  'loadOffers',
  async(_arg, {dispatch, extra: api}) => {
    dispatch(changeIsOffersLoadingStatus(true));
    const {data} = await api.get<OfferType[]>('/hotels');
    dispatch(loadOffers(data));
    dispatch(fillOffersList);
    dispatch(changeIsOffersLoadingStatus(false));
  }
);
