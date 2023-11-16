import { store } from '../store';

export type StateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  email: string;
  token: string;
};

export type CommentData = {
  rating: number;
  comment: string;
}

export type StatusOfferInfo = {
  id: number;
  status: number;
};
