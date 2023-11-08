import { useAppSelector } from '../../hooks';

export default function OfferListHeader(): JSX.Element {
  const currentCity = useAppSelector((state) => state.DATA.cityName);
  const offersForCurrentCity = useAppSelector(
    (state) => state.DATA.offersForCurrentCity
  );

  return (
    <b className="places__found">
      {offersForCurrentCity.length} places to stay in {currentCity}
    </b>
  );
}
