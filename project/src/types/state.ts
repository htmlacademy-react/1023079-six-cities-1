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

export type OfferType = {
  id: number;
  bedrooms: number;
  city: {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
    name: string;
  };
  description: string;
  goods: [string];
  host: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
  images: [string];
  isFavorite: boolean;
  isPremium: boolean;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export type ReviewType = {
  comment: string;
  date: string;
  id?: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
}
