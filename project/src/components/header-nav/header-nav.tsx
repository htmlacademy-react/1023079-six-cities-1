import { AuthorizationsStatus} from '../../consts';
import { useAppSelector } from '../../hooks';
import AuthorizedHeader from './authorized-header';
import UnAuthorizedHeader from './unauthorized-header';

export default function HeaderNav(): JSX.Element {
  const status = useAppSelector((state) => state.authorizationStatus);
  const getHeader = () => status === AuthorizationsStatus.Auth ? <AuthorizedHeader /> : <UnAuthorizedHeader />;

  return (
    <li className="header__nav-item user">
      {getHeader()}
    </li>
  );
}
