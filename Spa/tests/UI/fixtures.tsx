import * as React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssGlobalContextDefaultState } from '../../src/UI/Base/Context/CssGlobalContext/CssGlobalContextDefaultState';
import { store } from '../../src/configs/storeConfig'
import { CssGlobalContext } from '../../src/UI/Base/Context/CssGlobalContext/CssGlobalContext';
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
