import { useAppSelector } from '../../hooks';
import { NameSpace } from '../../consts';

export default function OfferListHeader(): JSX.Element {
  const offersForCurrentCity = useAppSelector((state) => state[NameSpace.Data].offersForCurrentCity);
  const cityName = useAppSelector((state) => state[NameSpace.Data].cityName);

  return (
    <b className="places__found">
      {offersForCurrentCity.length ?? 0} places to stay in {cityName}
    </b>
  );
}
