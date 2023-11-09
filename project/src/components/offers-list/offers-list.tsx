import Card from '../card/card';
import { OfferType } from '../../mocks/offers';
import React, { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSelectedOfferId } from '../../store/app-process/app-process.slice';
import { fillOffersList } from '../../store/data-process/data-process.slice';

function OfferList(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getOffersForCurrentCity = () => {
      dispatch(fillOffersList());
    };

    getOffersForCurrentCity();
  }, []);

  const offersForCurrentCity = useAppSelector(
    (state) => state.DATA.offersForCurrentCity
  );

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
