import { useAppSelector, useAppDispatch } from '../../hooks';
import { NameSpace, SORT_VARIANTS } from '../../consts';
import { changeSortType } from '../../store/data-process/data-process.slice';
import { toggleSorts } from '../../store/app-process/app-process.slice';

export default function SortVarients(): JSX.Element {
  const selectedSortType = useAppSelector((state) => state[NameSpace.Data].sortType);
  const dispatch = useAppDispatch();

  const changeSortHandler = (variant: string) => {
    dispatch(toggleSorts());
    dispatch(changeSortType(variant));
  };

  return (
    <ul className="places__options places__options--custom places__options--opened">
      {SORT_VARIANTS.map((variant) => {
        const className = selectedSortType === variant ? 'places__option--active' : '';

        return (
          <li
            onClick={() => changeSortHandler(variant)}
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
