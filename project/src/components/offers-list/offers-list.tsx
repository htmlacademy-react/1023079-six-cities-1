import Card from '../card/card';
import { OfferType } from '../../mocks/offers';
import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSelectedOfferId } from '../../store/app-process/app-process.slice';

function OfferList(): JSX.Element {
  const dispatch = useAppDispatch();
  const allOffers = useAppSelector((state) => state.DATA.allOffers);
  const cityName = useAppSelector((state) => state.DATA.cityName);
  const offersForCurrentCity = allOffers.filter((offer) => offer.city.name === cityName);

  const onMouseOverHandler = (id: number) => {
    dispatch(setSelectedOfferId(id));
  };

  const onMouseLeave = () => {
    dispatch(setSelectedOfferId(-1));
  };

  return (
    <React.Fragment>
      {offersForCurrentCity.map((offer: OfferType) => (
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
