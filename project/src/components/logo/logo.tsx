import { Link } from 'react-router-dom';
import { AppRoutes } from '../../consts';
import { memo } from 'react';

function Logo(): JSX.Element {
  return (
    <Link className="header__logo-link header__logo-link--active" to={AppRoutes.Main}>
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width="81"
        height="41"
      />
    </Link>
  );
}

export default memo(Logo);
