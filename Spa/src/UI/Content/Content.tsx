import * as React from 'react';
import { Route } from 'react-router-dom';
import Blog from './Blog/Blog';
import BlogList from './BlogList/BlogList';
import './Content.scss';
import Home from './Home/Home';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Setting from './Setting/Setting';
import Signup from './Signup/Signup';


const Content: React.FunctionComponent<{}> = (props: {}) => {

  return (
    <section className="content-wrapper">
      <Route path="/" exact component={Home} /> 
      {/** siince setting has route, remove 'exact' **/}
      <Route path="/setting" component={Setting} /> 
      <Route path="/login" exact component={Login} /> 
      <Route path="/logout" exact component={Logout} /> 
      <Route path="/signup" exact component={Signup} /> 
      <Route path="/blogs" exact component={BlogList} /> 
      <Route path="/blogs/:id" exact component={Blog} /> 
    </section>
  );
}

export default Content;

