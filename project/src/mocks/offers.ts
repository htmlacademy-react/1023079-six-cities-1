import { MOCK_OFFERS_COUNT } from '../consts';
import { LAT_LON_DATA } from '../consts';

export type OfferType = {
  id?: number;
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
  location?: {
    latitude?: number;
    longitude?: number;
    zoom: number;
  };
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

const OFFER: OfferType = {
  bedrooms: 3,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  goods: ['Heating'],
  host: {
    avatarUrl: 'img/1.png',
    id: 3,
    isPro: true,
    name: 'Angelina',
  },
  images: ['img/1.png'],
  isFavorite: true,
  isPremium: true,
  maxAdults: 4,
  previewImage: 'img/apartment-02.jpg',
  price: 120,
  rating: 4.8,
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
};

export const OFFERS: OfferType[] = Array.from({length: MOCK_OFFERS_COUNT}, (_, i) => {
  const offer = {...OFFER};
  offer.id = i;
  offer.location = {
    latitude: LAT_LON_DATA[i].lat,
    longitude: LAT_LON_DATA[i].lon,
    zoom: 8
  };


  // eslint-disable-next-line no-console
  console.log(offer);
  return offer;
});
