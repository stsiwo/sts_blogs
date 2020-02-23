import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Blog from './Blog/Blog';
import BlogList from './BlogList/BlogList';
import './Content.scss';
import Home from './Home/Home';
import Login from './Login/Login';
import Setting from './Setting/Setting';
import Signup from './Signup/Signup';
import { AuthRoute } from 'Components/AuthRoute';


const Content: React.FunctionComponent<{}> = (props: {}) => {

  return (
    <section className="content-wrapper">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/blogs" exact component={BlogList} />
        <Route path="/blogs/:blogId" exact component={Blog} />
        {/** siince setting has route, remove 'exact' **/}
        <AuthRoute path="/setting" component={Setting} />
      </Switch>
    </section>
  );
}

export default Content;

