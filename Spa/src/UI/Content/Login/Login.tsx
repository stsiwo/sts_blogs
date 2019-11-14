import { initialUserLoginStatus, UserLoginType, UserType } from 'domain/user/UserType';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { RequestMethodEnum, ResponseResultStatusEnum, UserResponseDataType } from 'requests/types';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { useRequest } from 'Hooks/Request/useRequest';
import { useUserLoginValidation } from 'Hooks/Validation/UserLogin/useUserLoginValidation';
import './Login.scss';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
var debug = require('debug')('ui:Login')

const Login: React.FunctionComponent<{}> = (props: {}) => {

  const [currentUserLoginStatus, setUserLoginStatus] = React.useState<UserLoginType>(initialUserLoginStatus)
  const { currentRequestStatus, setRequestStatus, sendRequest } = useRequest({})
  const { currentValidationError, touch, validate } = useUserLoginValidation({ domain: currentUserLoginStatus })

  const { dispatch } = useAuthContext()

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
            if (data) dispatch({ type: 'login', user: data.user as UserType })
          })
      }, () => {
        debug('validation failed at save button event handler') 
      })
  }

  return (
    <div className="login-form-cover">
      <h2 className="login-form-title">Login Form</h2>
      <FetchStatus 
        currentFetchStatus={currentRequestStatus} 
        setFetchStatus={setRequestStatus} 
        fetchingMsg={'requesting user login ...'}
        successMsg={'requesting user login success'}
        failureMsg={'requesting user login failed'}
      />
      <form className="login-form-content">
        <div className="login-form-content-item login-form-content-email">
          <label htmlFor="email" className="login-form-content-item-label">Email</label>
          <input type="email" name="email" id="email" className="login-form-content-item-input" placeholder="enter your email..." value={currentUserLoginStatus.email} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent} />
          {(currentValidationError.email && <div className="input-error">{currentValidationError.email}</div>)}
        </div>
        <div className="login-form-content-item login-form-content-password">
          <label htmlFor="password" className="login-form-content-item-label">Password</label>
          <input type="password" name="password" id="password" className="login-form-content-item-input" placeholder="enter your password..." value={currentUserLoginStatus.password} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent} />
          {(currentValidationError.password && <div className="input-error">{currentValidationError.password}</div>)}
        </div>
        <div className="login-form-content-item login-form-content-password-confirm">
          <label htmlFor="confirm" className="login-form-content-item-label">Password Confirm</label>
          <input type="password" name="confirm" id="confirm" className="login-form-content-item-input" placeholder="enter your password again..." value={currentUserLoginStatus.confirm} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent} />
          {(currentValidationError.confirm && <div className="input-error">{currentValidationError.confirm}</div>)}
        </div>
        <div className="">
          <span>if you don&rsquo;t have account  </span><Link to='/login' >Signup Page</Link>
        </div>
        <div className="login-form-content-btn-wrapper">
          {(currentValidationError.submit && <div className="input-error">{currentValidationError.submit}</div>)}
          <input className="regular-btn login-form-content-btn" type="button" onClick={handleSubmitClickEvent} value="Login" />
        </div>
      </form>
    </div>
  );
}

export default Login;


