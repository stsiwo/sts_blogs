import * as React from 'react';
import './Signup.scss';
import { UserSignupType, initialUserSignupStatus, UserType } from '../../../domain/user/UserType';
import { UserSignupValidationType, initialUserSignupValidationState, UserSignupInputTouchedType, initialUserSignupInputTouchedState } from '../../../domain/user/UserValidationType';
import { ResponseResultType, ResponseResultStatusEnum, RequestMethodEnum, UserResponseDataType } from '../../../requests/types';
import * as yup from 'yup'
import { request } from '../../../requests/request';
import { useDispatch } from 'react-redux';
import { toggleLoginStatusActionCreator } from '../../../actions/creators';
import { useAuthContext } from '../../Base/Context/AuthContext/AuthContext';
import { useUserSignupValidation } from '../../Base/Hooks/Validation/UserSignup/useUserSignupValidation';
import { useRequest } from '../../Base/Hooks/Request/useRequest';
import { Link } from 'react-router-dom';


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
    console.log('clicked update butuon')
    // final check validation ...
    validate()
      .then(() => {
        console.log('validation passed')
        sendRequest({
          path: '/signup',
          method: RequestMethodEnum.POST,
          headers: { 'content-type': 'application/json' },
          data: JSON.stringify(currentUserSignupStatus),
        })
          .then((data: UserResponseDataType) => {
            if (data) dispatch({ type: 'login', user: data.user as UserType })
          })
      })
  }

  return (
    <div className="signup-form-cover">
      <h2 className="signup-form-title">Signup Form</h2>
      {(currentRequestStatus.status === ResponseResultStatusEnum.FETCHING && <p>requesting user signup ...</p>)}
      {(currentRequestStatus.status === ResponseResultStatusEnum.SUCCESS && <p>requesting user signup success</p>)}
      {(currentRequestStatus.status === ResponseResultStatusEnum.FAILURE && <p>requesting user signup failed</p>)}
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
          <input className="signup-form-content-btn" type="button" onClick={handleSubmitClickEvent} value="Signup" />
        </div>
      </form>
    </div>
  );
}

export default Signup;



