import Card from '../card/card';
import { OfferType } from '../../mocks/offers';
import React, { useState } from 'react';

type OfferListType = {
  offers: OfferType[];
}

export function OfferList({offers}: OfferListType): JSX.Element {
  const [isCardActive, setIsCardActive] = useState(offers.map(() => false));

  const handleCardMouseOver = (id: number) => {
    setIsCardActive(() => {
      const newState = [...isCardActive];
      newState[id] = true;
      return newState;
    });
  };

  return (
    <React.Fragment>
      {offers.map((offer: OfferType) => (
        <Card
          key={offer.id}
          price={offer.price}
          img={offer.previewImage}
          type={offer.type}
          description={offer.description}
          onMouseOver={() => handleCardMouseOver(offer.id ? offer.id : 0)}
        />
      ))}
    </React.Fragment>
  );
}
