import { AxiosError, AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, AuthData, UserData } from '../types/state';
import { OfferType } from '../mocks/offers';
import { setError } from './user-process/user-process.slice';
import { saveToken } from '../token';

export const fetchOffersAction = createAsyncThunk<
  OfferType[],
  undefined,
  {
    dispatch: AppDispatchType;
    extra: AxiosInstance;
  }
>('loadOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<OfferType[]>('/hotels');
  return data;
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatchType;
    extra: AxiosInstance;
  }
>('checkAuthAction', async (_arg, { extra: api }) => {
  await api.get('/login');
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
  } catch (error) {
    if(error instanceof AxiosError && error.message) {
      dispatch(setError(error.message));
    }
  }
});
