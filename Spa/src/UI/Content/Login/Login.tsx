import { initialUserLoginStatus, UserLoginType, UserType } from 'domain/user/UserType';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { RequestMethodEnum, ResponseResultStatusEnum, UserResponseDataType } from 'requests/types';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { useRequest } from 'Hooks/Request/useRequest';
import { useUserLoginValidation } from 'Hooks/Validation/UserLogin/useUserLoginValidation';
import './Login.scss';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
import { useDispatch } from 'react-redux';
import Input from 'Components/Input/Input';
import { useRouteMatch } from 'react-router';
import { withRouter, RouteComponentProps } from 'react-router-dom';
var debug = require('debug')('ui:Login')

const Login: React.FunctionComponent<RouteComponentProps<{}>> = (props: RouteComponentProps<{}>) => {

  const [currentUserLoginStatus, setUserLoginStatus] = React.useState<UserLoginType>(initialUserLoginStatus)
  const { currentRequestStatus, setRequestStatus, sendRequest } = useRequest({})
  const { currentValidationError, touch, validate } = useUserLoginValidation({ domain: currentUserLoginStatus })

  const { auth, authDispatch } = useAuthContext()
  const { url, path } = useRouteMatch()

  const handleInputChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    currentUserLoginStatus[e.currentTarget.name as keyof UserLoginType] = e.currentTarget.value
    setUserLoginStatus({
      ...currentUserLoginStatus
    })
  }

  const handleInitialFocusEvent: React.EventHandler<React.FocusEvent<HTMLInputElement>> = (e) => {
    touch(e.currentTarget.name)
  }

  const handleSubmitClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = async (e) => {
    debug('clicked update butuon')
    // final check validation ...
    validate()
      .then(() => {
        debug('validation passed')
        sendRequest({
          path: '/login',
          method: RequestMethodEnum.POST,
          headers: { 'content-type': 'application/json' },
          data: JSON.stringify(currentUserLoginStatus)
        })
          .then((data: UserResponseDataType) => {
            if (data) {
              authDispatch({ type: 'login', user: data.user as UserType })
              props.history.push('/')
            }
          })
      }, () => {
        debug('validation failed at save button event handler')
      })
  }

  return (
    <div className="login-form-cover">
      <h2 className="login-form-title">Login</h2>
      <FetchStatus
        currentFetchStatus={currentRequestStatus}
        setFetchStatus={setRequestStatus}
        fetchingMsg={'requesting user login ...'}
        successMsg={'requesting user login success'}
        failureMsg={'requesting user login failed'}
      />
      <form className="signup-login-form-content">
        <Input
          id={"email"}
          inputStyle={"black-input"}
          inputValue={currentUserLoginStatus.email}
          label={"Email"}
          name={"email"}
          onInputChange={handleInputChangeEvent}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter your email..."}
          errorMsg={currentValidationError.email}
          errorStyle={'email-error small-input-error'}
        />
        <Input
          id={"password"}
          inputStyle={"black-input"}
          inputValue={currentUserLoginStatus.password}
          label={"Password"}
          name={"password"}
          onInputChange={handleInputChangeEvent}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter your password..."}
          errorMsg={currentValidationError.password}
          errorStyle={'password-error small-input-error'}
          inputType={'password'}
        />
        <Input
          id={"confirm"}
          inputStyle={"black-input"}
          inputValue={currentUserLoginStatus.confirm}
          label={"Confirm"}
          name={"confirm"}
          onInputChange={handleInputChangeEvent}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter your password again ..."}
          errorMsg={currentValidationError.confirm}
          errorStyle={'confirm-error small-input-error'}
          inputType={'password'}
        />
        <div className="signup-login-link-wrapper">
          <span>if you don&rsquo;t have account,  </span><Link to={`/signup`} >Signup Page</Link>
        </div>
        <div className="login-form-content-btn-wrapper">
          {(currentValidationError.submit && <div className="summary-error input-error">{currentValidationError.submit}</div>)}
          <input className="btn" type="button" onClick={handleSubmitClickEvent} value="Login" role="login-btn"/>
        </div>
      </form>
    </div >
  );
}

export default withRouter(Login);


