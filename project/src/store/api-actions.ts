import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatchType, AuthData, UserData } from '../types/state';
import { OfferType } from '../mocks/offers';
import { changeIsOffersLoadingStatus, fillOffersList, requireAuthorization, setOffers } from './action';
import { saveToken } from '../token';
import { AuthorizationsStatus } from '../consts';


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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get('/login');
      dispatch(requireAuthorization(AuthorizationsStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationsStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>('/login', {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationsStatus.Auth));
  },
);
