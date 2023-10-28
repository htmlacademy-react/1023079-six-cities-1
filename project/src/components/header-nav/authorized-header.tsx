import { Link } from 'react-router-dom';
import { AppRoutes } from '../../consts';
import { logoutAction } from '../../store/action';
import { useAppDispatch } from '../../hooks';

export default function AuthorizedHeader(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = localStorage.getItem('user') || 'User';
  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <>
      <Link
        className="header__nav-link header__nav-link--profile"
        to={AppRoutes.Favorites}
      >
        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
        <span className="header__user-name user__name">
          {user}
        </span>
        <span className="header__favorite-count">3</span>
      </Link>
      <a className="header__nav-link" href="#">
        <span
          onClick={logoutHandler}
          className="header__signout"
        >
          Sign out
        </span>
      </a>
    </>
  );
}