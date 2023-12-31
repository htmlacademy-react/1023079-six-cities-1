import { memo } from 'react';
import { AuthorizationsStatus, NameSpace} from '../../consts';
import { useAppSelector } from '../../hooks';
import AuthorizedHeader from './authorized-header';
import UnAuthorizedHeader from './unauthorized-header';

function HeaderNav(): JSX.Element {
  const status = useAppSelector((state) => state[NameSpace.User].authorizationStatus);
  const getHeader = () => status === AuthorizationsStatus.Auth ? <AuthorizedHeader /> : <UnAuthorizedHeader />;

  return (
    <li className="header__nav-item user">
      {getHeader()}
    </li>
  );
}

export default memo(HeaderNav);
