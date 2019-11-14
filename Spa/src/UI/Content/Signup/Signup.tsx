import { initialUserSignupStatus, UserSignupType, UserType } from 'domain/user/UserType';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { RequestMethodEnum, ResponseResultStatusEnum, UserResponseDataType } from 'requests/types';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { useRequest } from 'Hooks/Request/useRequest';
import { useUserSignupValidation } from 'Hooks/Validation/UserSignup/useUserSignupValidation';
import './Signup.scss';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
var debug = require('debug')('ui:Signup')

const Signup: React.FunctionComponent<{}> = (props: {}) => {

  const [currentUserSignupStatus, setUserSignupStatus] = React.useState<UserSignupType>(initialUserSignupStatus)
  const { currentRequestStatus, setRequestStatus, sendRequest } = useRequest({})
  const { currentValidationError, touch, validate } = useUserSignupValidation({ domain: currentUserSignupStatus })
  const { dispatch } = useAuthContext()

  const handleInputChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    currentUserSignupStatus[e.currentTarget.name as keyof UserSignupType] = e.currentTarget.value
    setUserSignupStatus({
      ...currentUserSignupStatus
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
          path: '/signup',
          method: RequestMethodEnum.POST,
          headers: { 'content-type': 'application/json' },
          data: JSON.stringify(currentUserSignupStatus),
        })
          .then((data: UserResponseDataType) => {
            if (data) dispatch({ type: 'login', user: data.user as UserType })
          })
      }, () => {
        debug('validation failed at save button event handler') 
      })
  }

  return (
    <div className="signup-form-cover">
      <h2 className="signup-form-title">Signup Form</h2>
      <FetchStatus 
        currentFetchStatus={currentRequestStatus} 
        setFetchStatus={setRequestStatus} 
        fetchingMsg={'requesting user signup ...'}
        successMsg={'requesting user signup success'}
        failureMsg={'requesting user signup failed'}
      />
      <form className="signup-form-content">
        <div className="signup-form-content-item signup-form-content-name">
          <label htmlFor="name" className="signup-form-content-item-label">User Name</label>
          <input type="text" name="name" id="name" className="signup-form-content-item-input" placeholder="enter your name..." value={currentUserSignupStatus.name} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent} />
          {(currentValidationError.name && <div className="input-error">{currentValidationError.name}</div>)}
        </div>
        <div className="signup-form-content-item signup-form-content-email">
          <label htmlFor="email" className="signup-form-content-item-label">Email</label>
          <input type="email" name="email" id="email" className="signup-form-content-item-input" placeholder="enter your email..." value={currentUserSignupStatus.email} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent} />
          {(currentValidationError.email && <div className="input-error">{currentValidationError.email}</div>)}
        </div>
        <div className="signup-form-content-item signup-form-content-password">
          <label htmlFor="password" className="signup-form-content-item-label">Password</label>
          <input type="password" name="password" id="password" className="signup-form-content-item-input" placeholder="enter your password..." value={currentUserSignupStatus.password} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent} />
          {(currentValidationError.password && <div className="input-error">{currentValidationError.password}</div>)}
        </div>
        <div className="signup-form-content-item signup-form-content-password-confirm">
          <label htmlFor="confirm" className="signup-form-content-item-label">Password Confirm</label>
          <input type="password" name="confirm" id="confirm" className="signup-form-content-item-input" placeholder="enter your password again..." value={currentUserSignupStatus.confirm} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent} />
          {(currentValidationError.confirm && <div className="input-error">{currentValidationError.confirm}</div>)}
        </div>
        <div className="">
          <span>if you alreay have account </span><Link to='/login' >Login Page</Link>
        </div>
        <div className="signup-form-content-btn-wrapper">
          {(currentValidationError.submit && <div className="input-error">{currentValidationError.submit}</div>)}
          <input className="signup-form-content-btn" type="button" onClick={handleSubmitClickEvent} value="Signup" />
        </div>
      </form>
    </div>
  );
}

export default Signup;



