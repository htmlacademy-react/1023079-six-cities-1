import Card from '../card/card';
import { OfferType } from '../../mocks/offers';
import React from 'react';

type OfferListType = {
  offers: OfferType[];
}

export function OfferList({offers}: OfferListType): JSX.Element {
  return (
    <React.Fragment>
      {offers.map((offer: OfferType) => (
        <Card
          key={offer.id}
          price={offer.price}
          img={offer.previewImage}
          type={offer.type}
          description={offer.description}
        />
      ))}
    </React.Fragment>
  );
}
