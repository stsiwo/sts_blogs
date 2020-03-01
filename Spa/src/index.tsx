import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'configs/storeConfig';
import { AuthContext, useUpdateAuthContextReducer } from 'Contexts/AuthContext/AuthContext';
import { CssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';
import { CssGlobalContextDefaultState } from 'Contexts/CssGlobalContext/CssGlobalContextDefaultState';
import { useLocation } from "react-router";
import 'ui/Base/Css/Common.scss';
import Content from 'ui/Content/Content';
import Header from 'ui/Header/Header';
import Footer from 'ui/Footer/Footer';
var debug = require('debug')('ui:Index')

// import css for debug (only development)
if (NODE_ENV === 'development') require('ui/Base/Css/Debug.scss');

/**
 * scroll to top when new page visit
 * https://reacttraining.com/react-router/web/guides/scroll-restoration
 **/
const ScrollToTop: React.FunctionComponent<{}> = (props) => {

  const { pathname } = useLocation()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}


// enable debug
DEBUG
debug('env vars:')
debug(DEBUG)

var debug = require('debug')('ui:App')
const App = (props: any) => {
  debug('get initial auth and dispatch from context')
  const [auth, authDispatch] = useUpdateAuthContextReducer()

  return (
    <div className="app-wrapper">
      <CssGlobalContext.Provider value={CssGlobalContextDefaultState}>
        <AuthContext.Provider value={{ auth, authDispatch }}>
          <Provider store={store}>
            <Router>
              <ScrollToTop />
              <Header />
              <Content />
              <Footer />
            </Router>
          </Provider>
        </AuthContext.Provider>
      </CssGlobalContext.Provider>
    </div>
  );
};

ReactDOM.render(
  <App />
  , document.getElementById('root')
)
