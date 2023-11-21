import { AxiosError, AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, AuthData, OfferType, StatusOfferInfo, UserData } from '../types/state';
import { setError } from './user-process/user-process.slice';
import { saveToken } from '../token';

type id = {
  id: number;
}

export const fetchOffersAction = createAsyncThunk<
  OfferType[],
  undefined,
  {
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

    return Promise.reject();
  }
});

export const loadFavoriteOffers = createAsyncThunk<
  OfferType[],
  undefined,
  {
    extra: AxiosInstance;
  }
>('loadFavoriteOffers', async (_arg, {extra: api}) => {
  const {data} = await api.get<OfferType[]>('/favorite');
  return data;
});

export const changeFavoriteStatusForOffer = createAsyncThunk<
  OfferType,
  StatusOfferInfo,
  {
    extra: AxiosInstance;
    dispatch: AppDispatchType;
  }
>('changeFavoriteStatusForOffer', async({id, status}, {dispatch, extra: api}) => {
  try {
    const {data} = await api.post<OfferType>(`/favorite/${id}/${status}}`);
    return data;
  } catch (error) {
    if(error instanceof AxiosError && error.message) {
      dispatch(setError(error.message));
    }
    return Promise.reject();
  }
});

export const getNearbyOffers = createAsyncThunk<
OfferType[],
id,
{
  extra: AxiosInstance;
  dispatch: AppDispatchType;
}
>('getNearbyOffers', async({id}, {dispatch, extra: api}) => {
  try {
    const {data} = await api.get<OfferType[]>(`https://12.react.pages.academy/six-cities/hotels/${id}/nearby`);
    return data;
  } catch (error) {
    if(error instanceof AxiosError && error.message) {
      dispatch(setError(error.message));
    }
    return Promise.reject();
  }
});
