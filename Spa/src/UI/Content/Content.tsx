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


const Content: React.FunctionComponent<{}> = (props: {}) => {

  return (
    <section className="content-wrapper">
      <Route path="/" exact component={Home} /> 
      <Route path="/setting" exact component={Setting} /> 
      <Route path="/login" exact component={Login} /> 
      <Route path="/signup" exact component={Signup} /> 
      <Route path="/blog" exact component={BlogList} /> 
    </section>
  );
}

export default Content;

