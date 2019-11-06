import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext/AuthContext';
import { RoleEnum } from '../../../domain/user/UserType';

export declare type AdminAuthRoutePropType = {
  component: React.ComponentType,
  [key: string]: any
}

export const AdminAuthRoute: React.FunctionComponent<AdminAuthRoutePropType> = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props: RouteProps) => {

    const { auth } = useAuthContext()

    if (!auth.authed) return <Redirect to='/login' />

    if (auth.user.role !== RoleEnum.ADMIN) return <Redirect to='/' />

    return <Component {...props} />
  }} />
)

