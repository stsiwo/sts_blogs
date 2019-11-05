import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CssGlobalContext } from './UI/Base/Context/CssGlobalContext/CssGlobalContext';
import { CssGlobalContextDefaultState } from './UI/Base/Context/CssGlobalContext/CssGlobalContextDefaultState';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './UI/Header/Header';
import Content from './UI/Content/Content';
import './UI/Base/Css/Common.scss';
import { createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { store } from './configs/storeConfig';
import { storeUserInfo } from './storages/user';
import { getUserTestData } from '../tests/data/UserFaker';

// test user login
storeUserInfo(getUserTestData(1)[0])

const App = (props: any) => {
  return (
    <div>
      <CssGlobalContext.Provider value={CssGlobalContextDefaultState}>
        <Provider store={store}>
          <Router>
            <Header />
            <Content />
          </Router>
        </Provider>
      </CssGlobalContext.Provider>
    </div>
  );
};

ReactDOM.render(
  <App />
  , document.getElementById('root')
)
