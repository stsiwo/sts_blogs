import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './configs/storeConfig';
import { AuthContext, useUpdateAuthContextReducer } from './UI/Base/Context/AuthContext/AuthContext';
import { CssGlobalContext } from './UI/Base/Context/CssGlobalContext/CssGlobalContext';
import { CssGlobalContextDefaultState } from './UI/Base/Context/CssGlobalContext/CssGlobalContextDefaultState';
import './UI/Base/Css/Common.scss';
import Content from './UI/Content/Content';
import Header from './UI/Header/Header';
import { getUserTestData } from '../tests/data/UserFaker';

// test user login

const App = (props: any) => {
  //const [auth, dispatch] = useUpdateAuthContextReducer({
  //  authed: true,
  //  user: getUserTestData(1)[0]
  //})
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
