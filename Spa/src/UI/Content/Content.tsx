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
import ForgotPasswordEmailModal from 'Components/ForgotPasswordEmailModal/ForgotPasswordEmailModal';
import { useLocation } from 'react-router';
import ResetPassword from './ResetPassword/ResetPassword';


const Content: React.FunctionComponent<{}> = (props: {}) => {


  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  // reference: https://reacttraining.com/react-router/web/example/modal-gallery
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <section className="content-wrapper">
      <Switch location={background || location}>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/password-reset/:token" exact component={ResetPassword} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/blogs" exact component={BlogList} />
        <Route path="/blogs/:blogId" exact component={Blog} />
        {/** siince setting has route, remove 'exact' **/}
        <AuthRoute path="/setting" component={Setting} />
      </Switch>
      {/* Show the modal when a background page is set */}
      {background && <Route path="/forgot-password" children={<ForgotPasswordEmailModal />} />}
    </section>
  );
}

export default Content;

