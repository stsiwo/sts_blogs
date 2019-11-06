import * as React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssGlobalContextDefaultState } from '../../src/UI/Base/Context/CssGlobalContext/CssGlobalContextDefaultState';
import { store } from '../../src/configs/storeConfig'
import { CssGlobalContext } from '../../src/UI/Base/Context/CssGlobalContext/CssGlobalContext';
import { AuthContext, useUpdateAuthContextReducer } from '../../src/UI/Base/Context/AuthContext/AuthContext';
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
}

/** create this because of useReducer hook **/
export const ContextWrapperComponent: React.FunctionComponent<ContextWrapperComponentPropsType> = (props: ContextWrapperComponentPropsType) => {

  const TargetComponent = props.component

  const [auth, dispatch] = useUpdateAuthContextReducer()

  return (
    <CssGlobalContext.Provider value={CssGlobalContextDefaultState}>
      <AuthContext.Provider value={{ auth, dispatch }}>
        <Provider store={store}>
          <Router>
            <TargetComponent />
          </Router>
        </Provider>
      </AuthContext.Provider>
    </CssGlobalContext.Provider>
  )
}
