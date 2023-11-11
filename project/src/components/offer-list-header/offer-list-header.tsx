import { useAppSelector } from '../../hooks';

export default function OfferListHeader(): JSX.Element {
  const allOffers = useAppSelector((state) => state.DATA.allOffers);
  const cityName = useAppSelector((state) => state.DATA.cityName);
  const offersForCurrentCity = allOffers.filter((offer) => offer.city.name === cityName);

  return (
    <b className="places__found">
      {offersForCurrentCity.length} places to stay in {cityName}
    </b>
  );
}
