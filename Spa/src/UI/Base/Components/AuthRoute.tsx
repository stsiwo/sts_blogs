import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext/AuthContext';

export declare type AuthRoutePropType = {
  component: React.ComponentType,
  [key: string]: any
}

export const AuthRoute: React.FunctionComponent<AuthRoutePropType> = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props: RouteProps) => {

    const { auth } = useAuthContext()

    if (!auth.authed) return <Redirect to='/login' />

    return <Component {...props} />
  }} />
)
