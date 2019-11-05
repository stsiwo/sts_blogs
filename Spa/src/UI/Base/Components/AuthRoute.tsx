import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getUserInfo } from '../../../storages/user';

export declare type AuthRoutePropType = {
  component: React.ComponentType,
  [key: string]: any
}

export const AuthRoute: React.FunctionComponent<AuthRoutePropType> = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props: RouteProps) => {

    const authUser = getUserInfo()

    if (authUser === null) return <Redirect to='/login' />

    return <Component {...props} />
  }} />
)
