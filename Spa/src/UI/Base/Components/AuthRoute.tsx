import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext/AuthContext';

export declare type AuthRoutePropType = {
  component: React.ComponentType,
  [key: string]: any
}

export const AuthRoute: React.FunctionComponent<AuthRoutePropType> = ({ component: Component, ...rest }) => {
    const { auth } = useAuthContext()
  console.log(auth)
    if (!auth.authed) return <Redirect to='/login' />
    return <Route {...rest} render={(props: RouteProps) => <Component {...props} />} /> 
}
