import { AxiosError, AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, AuthData, UserData } from '../types/state';
import { OfferType } from '../mocks/offers';
import {
  changeIsOffersLoadingStatus,
  fillOffersList,
  requireAuthorization,
  setError,
  setOffers,
} from './action';
import { saveToken } from '../token';
import { AuthorizationsStatus } from '../consts';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatchType;
    extra: AxiosInstance;
  }
>('loadOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(changeIsOffersLoadingStatus(true));
  const { data } = await api.get<OfferType[]>('/hotels');
  dispatch(setOffers(data));
  dispatch(fillOffersList());
  dispatch(changeIsOffersLoadingStatus(false));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatchType;
    extra: AxiosInstance;
  }
>('checkAuthAction', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get('/login');
    dispatch(requireAuthorization(AuthorizationsStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationsStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatchType;
    extra: AxiosInstance;
  }
>('loginAction', async ({ login, password }, { dispatch, extra: api }) => {
  try {
    const {
      data: { token, email },
    } = await api.post<UserData>('/login', { email: login, password });
    localStorage.setItem('user', email);
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationsStatus.Auth));
  } catch (error) {
    if(error instanceof AxiosError && error.message) {
      dispatch(setError(error.message));
    }
  }
});
