import * as React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { CssGlobalContextDefaultState } from 'Contexts/CssGlobalContext/CssGlobalContextDefaultState';
import { store } from 'configs/storeConfig'
import { CssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';
import { AuthContext, useUpdateAuthContextReducer } from 'Contexts/AuthContext/AuthContext';
import { AuthType, AuthContextType } from 'Contexts/AuthContext/types';
import { getUserTestData } from '../data/UserFaker';
import { storeUserInfo, removeUserInfo } from 'src/storages/user';
/** 
 * CssGlobalContext
 * Redux Provider stre
 * Router
 **/
export const getAllContextComponent = (TargetComponent: React.ComponentType) => {
  return (
    <CssGlobalContext.Provider value={CssGlobalContextDefaultState}>
      <Provider store={store}>
        <Router>
          <TargetComponent />
        </Router>
      </Provider>
    </CssGlobalContext.Provider>
  )
}

declare type ContextWrapperComponentPropsType = {
  component: React.ComponentType
  isAuth?: boolean
  initialRoute?: string
}

/** create this because of useReducer hook **/
export const ContextWrapperComponent: React.FunctionComponent<ContextWrapperComponentPropsType> = (props: ContextWrapperComponentPropsType) => {

  const TargetComponent = props.component

  let defaultAuth: AuthType = null
  if (props.isAuth) {
    defaultAuth = {
      authed: true,
      user: getUserTestData(1)[0]
    }
    storeUserInfo(defaultAuth.user)
  } else {
    removeUserInfo()
  }

  const [auth, authDispatch] = useUpdateAuthContextReducer(defaultAuth)

  console.log(auth)

  const initialRoute: string = props.initialRoute ? props.initialRoute : "/"

  return (
    <CssGlobalContext.Provider value={CssGlobalContextDefaultState}>
      <AuthContext.Provider value={{ auth, authDispatch }}>
        <Provider store={store}>
          <MemoryRouter initialEntries={[initialRoute]} initialIndex={0}>
            <TargetComponent />
          </MemoryRouter>
        </Provider>
      </AuthContext.Provider>
    </CssGlobalContext.Provider>
  )
}


