import Card from '../card/card';
import { OfferType } from '../../mocks/offers';
import React, { useState } from 'react';

type OfferListType = {
  offers: OfferType[];
  onOfferListItemHover: (id: number) => void;
}

export function OfferList({offers, onOfferListItemHover}: OfferListType): JSX.Element {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCardId, setActiveCardId] = useState(-1);

  const onMouseOverHandler = (id: number) => {
    setActiveCardId(id);
    onOfferListItemHover(id);
  };

  const onMouseLeave = () => {
    setActiveCardId(-1);
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
          onMouseOver={() => onMouseOverHandler(offer.id !== undefined ? offer.id : -1)}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </React.Fragment>
  );
}
