import { CITIES_LIST } from '../../consts';
import { useAppDispatch, useAppSelector} from '../../hooks';
import { changeCity, fillOffersList } from '../../store/action';

export function CitiesList(): JSX.Element {
  const choosenCity = useAppSelector((state) => state.cityName);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {CITIES_LIST.map((cityName) => {
        const className = cityName === choosenCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item';

        return (
          <li className="locations__item" key={cityName} onClick={() => {
            dispatch(changeCity(cityName));
            dispatch(fillOffersList());
          }}
          >
            <a className={className} href="#">
              <span>{cityName}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
