import { useAppSelector, useAppDispatch } from '../../hooks';
import { SORT_VARIANTS } from '../../consts';
import { changeSortType } from '../../store/action';

export default function SortVarients(): JSX.Element {
  const selectedSortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();

  return (
    <ul className="places__options places__options--custom places__options--opened">
      {SORT_VARIANTS.map((variant) => {
        const className = selectedSortType === variant ? 'places__option--active' : '';

        return (
          <li
            onClick={() => dispatch(changeSortType(variant))}
            className={`places__option ${className}`}
            tabIndex={0}
            key={variant}
          >
            {variant}
          </li>
        );
      })}
    </ul>
  );
}
