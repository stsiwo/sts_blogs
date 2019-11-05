import * as React from 'react';
import './Content.scss';
import { useResponsiveComponent } from '../Base/Hooks/ResponsiveComponentHook';
import { useCssGlobalContext } from '../Base/Context/CssGlobalContext/CssGlobalContext';
import { Route } from 'react-router-dom';
import Home from './Home/Home';
import Setting from './Setting/Setting';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import BlogList from './BlogList/BlogList';
import Blog from './Blog/Blog';
import Logout from './Logout/Logout';


const Content: React.FunctionComponent<{}> = (props: {}) => {

  return (
    <section className="content-wrapper">
      <Route path="/" exact component={Home} /> 
      {/** siince setting has route, remove 'exact' **/}
      <Route path="/setting" component={Setting} /> 
      <Route path="/login" exact component={Login} /> 
      <Route path="/logout" exact component={Logout} /> 
      <Route path="/signup" exact component={Signup} /> 
      <Route path="/blog" exact component={BlogList} /> 
      <Route path="/blog/:id" exact component={Blog} /> 
    </section>
  );
}

export default Content;

