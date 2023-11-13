import { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { NameSpace } from '../../consts';

export default function OfferListHeader(): JSX.Element {
  const allOffers = useAppSelector((state) => state[NameSpace.Data].allOffers);
  const cityName = useAppSelector((state) => state[NameSpace.Data].cityName);
  const offersForCurrentCity = useMemo(() => allOffers.filter((offer) => offer.city.name === cityName), [allOffers, cityName]);

  return (
    <b className="places__found">
      {offersForCurrentCity.length ?? 0} places to stay in {cityName}
    </b>
  );
}
