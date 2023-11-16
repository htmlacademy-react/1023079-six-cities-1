import { memo } from 'react';
import { CITIES_LIST, NameSpace } from '../../consts';
import { useAppDispatch, useAppSelector} from '../../hooks';
import { changeCity } from '../../store/data-process/data-process.slice';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const choosenCity = useAppSelector((state) => state[NameSpace.Data].cityName);


  const getCitiesList = () => (
    CITIES_LIST.map((cityName) => {
      const className = cityName === choosenCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item';

      return (
        <li className="locations__item" key={cityName} onClick={() => {
          dispatch(changeCity(cityName));
        }}
        >
          <a className={className} href="#">
            <span>{cityName}</span>
          </a>
        </li>
      );
    })
  );

  return (
    <ul className="locations__list tabs__list">
      {getCitiesList()}
    </ul>
  );
}

export default memo(CitiesList);
