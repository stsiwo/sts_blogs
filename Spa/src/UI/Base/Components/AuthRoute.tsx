import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
var debug = require('debug')('ui:AuthRoute')

export declare type AuthRoutePropType = {
  component: React.ComponentType,
  [key: string]: any
}

export const AuthRoute: React.FunctionComponent<AuthRoutePropType> = ({ component: Component, ...rest }) => {
  const { auth } = useAuthContext()
  debug(auth)
  if (!auth.authed) return <Redirect to='/login' />
  return <Route {...rest} render={(props: RouteProps) => <Component {...props} />} />
}
