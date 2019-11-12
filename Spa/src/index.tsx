import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './configs/storeConfig';
import { AuthContext, useUpdateAuthContextReducer } from 'uiBaseContext/AuthContext/AuthContext';
import { CssGlobalContext } from 'uiBaseContext/CssGlobalContext/CssGlobalContext';
import { CssGlobalContextDefaultState } from 'uiBaseContext/CssGlobalContext/CssGlobalContextDefaultState';
import './UI/Base/Css/Common.scss';
import Content from 'ui/Content/Content';
import Header from './UI/Header/Header';
import { getUserTestData } from '../tests/data/UserFaker';


// enable debug
process.env.DEBUG

var debug = require('debug')('ui:App')


const App = (props: any) => {
  debug('Component start')
  //const [auth, dispatch] = useUpdateAuthContextReducer({
  //  authed: true,
  //  user: getUserTestData(1)[0]
  //})

  debug('get initial auth and dispatch from context')
  const [auth, dispatch] = useUpdateAuthContextReducer()



  return (
    <div>
      <CssGlobalContext.Provider value={CssGlobalContextDefaultState}>
        <AuthContext.Provider value={{ auth, dispatch }}>
          <Provider store={store}>
            <Router>
              <Header />
              <Content />
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
