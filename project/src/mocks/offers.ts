import { MOCK_OFFERS_COUNT } from '../consts';

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
  isPremium: false,
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
  maxAdults: 4,
  previewImage: 'img/apartment-02.jpg',
  price: 120,
  rating: 4.8,
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
};

// const makeMockOffers = (count: number) => {
//   const result = [];
//   for(let i = 0; i < count; i++) {
//     const offer = OFFER;
//     offer.id = i;
//     result.push(offer);
//   }

//   return result;
// };

// export const OFFERS: OfferType[] = makeMockOffers(MOCK_OFFERS_COUNT);

export const OFFERS: OfferType[] = Array.from({length: MOCK_OFFERS_COUNT}, (_, i) => {
  const offer = {...OFFER, id: i};
  return offer;
});
