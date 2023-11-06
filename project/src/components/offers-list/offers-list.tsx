import Card from '../card/card';
import { OfferType } from '../../mocks/offers';
import React, { memo, useCallback } from 'react';

type OfferListType = {
  offers: OfferType[];
  onOfferListItemHover: (id: number) => void;
}

function OfferList({offers, onOfferListItemHover}: OfferListType): JSX.Element {
  const onMouseOverHandler = useCallback(
    (id: number) => {
      onOfferListItemHover(id);
    }, []
  );

  const onMouseLeave = useCallback(
    () => {
      onOfferListItemHover(-1);
    }, []
  );

  return (
    <React.Fragment>
      {offers.map((offer: OfferType) => (
        <Card
          rating={offer.rating}
          key={offer.id}
          id={offer.id}
          price={offer.price}
          img={offer.previewImage}
          type={offer.type}
          description={offer.description}
          onMouseOver={() => onMouseOverHandler(offer.id)}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </React.Fragment>
  );
}

export default memo(OfferList);
