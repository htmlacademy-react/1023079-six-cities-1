import { Link } from 'react-router-dom';
import { AppRoutes } from '../../consts';

export default function UnAuthorizedHeader(): JSX.Element {
  return (
    <Link
      className="header__nav-link header__nav-link--profile"
      to={AppRoutes.Login}
    >
      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
      <span className="header__login">Sign in</span>
    </Link>
  );
}
