import Card from '../card/card';
import { OfferType } from '../../mocks/offers';
import React, { memo } from 'react';
import { useAppDispatch } from '../../hooks';
import { setSelectedOfferId } from '../../store/action';

type OfferListType = {
  offers: OfferType[];
}

function OfferList({offers}: OfferListType): JSX.Element {
  const dispatch = useAppDispatch();

  const onMouseOverHandler = (id: number) => {
    dispatch(setSelectedOfferId(id));
  };

  const onMouseLeave = () => {
    dispatch(setSelectedOfferId(-1));
  };

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
