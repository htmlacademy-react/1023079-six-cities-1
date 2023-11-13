import { NameSpace } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleSorts } from '../../store/app-process/app-process.slice';
import SortVarients from '../sort-variants/sort-varients';

export default function Sorts(): JSX.Element {
  const dispatch = useAppDispatch();
  const isSortsOpen = useAppSelector((state) => state[NameSpace.App].isSortsOpen);
  const sortType = useAppSelector((state) => state[NameSpace.Data].sortType);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        onClick={() => dispatch(toggleSorts())}
        className="places__sorting-type"
        tabIndex={0}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isSortsOpen && <SortVarients />}
    </form>
  );
}
