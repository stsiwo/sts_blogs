import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'configs/storeConfig';
import { AuthContext, useUpdateAuthContextReducer } from 'Contexts/AuthContext/AuthContext';
import { CssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';
import { CssGlobalContextDefaultState } from 'Contexts/CssGlobalContext/CssGlobalContextDefaultState';
import 'ui/Base/Css/Common.scss';
import Content from 'ui/Content/Content';
import Header from 'ui/Header/Header';
import Footer from 'ui/Footer/Footer';

// import css for debug (only development)
if (NODE_ENV === 'development') require('ui/Base/Css/Debug.scss');


// enable debug
DEBUG
console.log('env vars:')
console.log(DEBUG)

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
