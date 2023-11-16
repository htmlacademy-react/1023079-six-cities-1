import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthorizationsStatus, NameSpace } from '../../consts';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute({ children}: PrivateRouteProps): JSX.Element {
  const status = useAppSelector((state) => state[NameSpace.User].authorizationStatus);

  switch(status) {
    case AuthorizationsStatus.Auth:
      return children;
    case AuthorizationsStatus.NoAuth:
      return <Navigate to={AppRoutes.Login} />;
    default:
      return <h1><b>Loading, please wait...</b></h1>;
  }
}
