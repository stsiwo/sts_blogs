import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Content.scss';
const Home = React.lazy(() => import(/* webpackChunkName: "home" */"./Home/Home"));
const Blog = React.lazy(() => import(/* webpackChunkName: "blog" */"./Blog/Blog"));
const BlogList = React.lazy(() => import(/* webpackChunkName: "blogList" */"./BlogList/BlogList"));
const Login = React.lazy(() => import(/* webpackChunkName: "login" */"./Login/Login"));
const Setting = React.lazy(() => import(/* webpackChunkName: "setting" */"./Setting/Setting"));
const Signup = React.lazy(() => import(/* webpackChunkName: "signup" */"./Signup/Signup"));
const ResetPassword = React.lazy(() => import(/* webpackChunkName: "resetPassword" */"./ResetPassword/ResetPassword"));
const GorgotPasswordEmailModal = React.lazy(() => import(/* webpackChunkName: "forgotPassword" */"Components/ForgotPasswordEmailModal/ForgotPasswordEmailModal"));
import { AuthRoute } from 'Components/AuthRoute';
import ForgotPasswordEmailModal from 'Components/ForgotPasswordEmailModal/ForgotPasswordEmailModal';
import { useLocation } from 'react-router';
import Loading from 'ui/Base/Icons/Loading/Loading';


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
      <React.Suspense fallback={<Loading />} >
        <Switch location={background || location}>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/password-reset" exact component={ResetPassword} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/blogs" exact component={BlogList} />
          <Route path="/blogs/:blogId" exact component={Blog} />
          {/** siince setting has route, remove 'exact' **/}
          <AuthRoute path="/setting" component={Setting} />
        </Switch>
        {/* Show the modal when a background page is set */}
        {background && <Route path="/forgot-password" children={<ForgotPasswordEmailModal />} />}
      </React.Suspense>
    </section>
  );
}

export default Content;

