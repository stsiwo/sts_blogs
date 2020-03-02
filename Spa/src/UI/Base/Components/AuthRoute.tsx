import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { logger } from 'configs/logger';
const log = logger("AuthContext");

export declare type AuthRoutePropType = {
  component: React.ComponentType,
  [key: string]: any
}

export const AuthRoute: React.FunctionComponent<AuthRoutePropType> = ({ component: Component, ...rest }) => {
  const { auth } = useAuthContext()
  log(auth)
  if (!auth.authed) return <Redirect to='/login' />
  return <Route {...rest} render={(props: RouteProps) => <Component {...props} />} />
}
