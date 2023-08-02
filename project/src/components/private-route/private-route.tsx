import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthorizationsStatus } from '../../consts';

type PrivateRouteProps = {
  authorizationStatus: string;
  children: JSX.Element;
}

export default function PrivateRoute({authorizationStatus, children}: PrivateRouteProps): JSX.Element {
  return(
    authorizationStatus === AuthorizationsStatus.Auth
      ? children
      : <Navigate to={AppRoutes.Login} />
  );
}
