import * as React from 'react';
import './Signup.scss';
import { UserSignupType, initialUserSignupStatus, UserType } from '../../../domain/user/UserType';
import { UserSignupValidationType, initialUserSignupValidationState, UserSignupInputTouchedType, initialUserSignupInputTouchedState } from '../../../domain/user/UserValidationType';
import { ResponseResultType, ResponseResultStatusEnum, RequestMethodEnum } from '../../../requests/types';
import * as yup from 'yup'
import { request } from '../../../requests/request';
import { storeUserInfo } from '../../../storages/user';


const Signup: React.FunctionComponent<{}> = (props: {}) => {

  const [currentUserSignupStatus, setUserSignupStatus] = React.useState<UserSignupType>(initialUserSignupStatus)
  const [currentValidationError, setValidationError] = React.useState<UserSignupValidationType>(initialUserSignupValidationState)
  const [currentInputTouched, setInputTouched] = React.useState<UserSignupInputTouchedType>(initialUserSignupInputTouchedState)

  const [currentSignupRequestStatus, setSignupRequestStatus] = React.useState<ResponseResultType>({
    status: ResponseResultStatusEnum.INITIAL
  })

  let schema = yup.object().shape<UserSignupType>({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm: yup.string().required().oneOf([yup.ref('password'), null], 'passwords must match')
  });

  React.useEffect(() => {
    function validateFormInput() {
      schema
        .validate(currentUserSignupStatus, {
          abortEarly: false
        })
        .then(() => {
          console.log('validation passed')
          setValidationError({
            ...initialUserSignupValidationState
          })
        })
        .catch((error: yup.ValidationError) => {
          console.log('validation error detected')
          console.log(error)
          // clear all of error message first
          for (let key in currentValidationError) delete currentValidationError[key as keyof UserSignupType]
          // assign new error message 
          error.inner.forEach((eachError: yup.ValidationError) => {
            if (currentInputTouched[eachError.path as keyof UserSignupType])
              currentValidationError[eachError.path as keyof UserSignupType] = eachError.message
          })
          setValidationError({
            ...currentValidationError
          })
        })
    }
    console.log('validating input.... should be called only mount and when input is updated')
    validateFormInput()
    return () => {
    };
  }, [
      ...Object.values(currentUserSignupStatus),
      ...Object.values(currentInputTouched) // for update when input focus
    ]);

  const handleInputChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    currentUserSignupStatus[e.currentTarget.name as keyof UserSignupType] = e.currentTarget.value
    setUserSignupStatus({
      ...currentUserSignupStatus
    })
  }

  const handleInitialFocusEvent: React.EventHandler<React.FocusEvent<HTMLInputElement>> = (e) => {
    currentInputTouched[e.currentTarget.name as keyof UserSignupValidationType] = true
    setInputTouched({
      ...currentInputTouched
    })
  }

  const handleSubmitClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = async (e) => {
    console.log('clicked update butuon')
    // final check validation ...
    schema.validate(currentUserSignupStatus, {
      abortEarly: false 
    })
      .then(async () => {
        console.log('validation passed')

        // set headers (multipart/form-data)
        const headers: {} = { 'content-type': 'application/json' }

        setSignupRequestStatus({
          status: ResponseResultStatusEnum.FETCHING
        })
        // send request
        await request({
          url: '/signup',
          method: RequestMethodEnum.POST,
          headers: headers,
          data: JSON.stringify(currentUserSignupStatus)
        })
          .then((responseResult: ResponseResultType) => {
            setSignupRequestStatus({
              status: responseResult.status
            })
            // save user info in response data to localStorage
            // this is to identify user is login or not (redux is not useful when reload)
            // assuming data.user exists in response
            if (responseResult.data) storeUserInfo(responseResult.data.user as UserType)
          })
          .catch((responseResult: ResponseResultType) => {
            setSignupRequestStatus({
              status: responseResult.status,
              errorMsg: responseResult.errorMsg
            })
          })
      })
      .catch((error: yup.ValidationError) => {
        console.log('validation failed')
        console.log(error)
        error.inner.forEach((eachError: yup.ValidationError) => {
          currentValidationError[eachError.path as keyof UserSignupType] = eachError.message
        })
        setValidationError({
          ...currentValidationError
        })
        return false
      })
  }

  return (
    <div className="signup-form-cover">
      <h2 className="signup-form-title">Signup Form</h2>
      {(currentSignupRequestStatus.status === ResponseResultStatusEnum.FETCHING && <p>requesting user signup ...</p>)}
      {(currentSignupRequestStatus.status === ResponseResultStatusEnum.SUCCESS && <p>requesting user signup success</p>)}
      {(currentSignupRequestStatus.status === ResponseResultStatusEnum.FAILURE && <p>requesting user signup failed</p>)}
      <form className="signup-form-content">

        <div className="signup-form-content-item signup-form-content-name">
          <label htmlFor="name" className="signup-form-content-item-label">User Name</label>
          <input type="text" name="name" id="name" className="signup-form-content-item-input" placeholder="enter your name..." value={currentUserSignupStatus.name} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent}/>
        {(currentValidationError.name && <div className="input-error">{currentValidationError.name}</div>)}
        </div>
        <div className="signup-form-content-item signup-form-content-email">
          <label htmlFor="email" className="signup-form-content-item-label">Email</label>
          <input type="email" name="email" id="email" className="signup-form-content-item-input" placeholder="enter your email..." value={currentUserSignupStatus.email} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent}/>
        {(currentValidationError.email && <div className="input-error">{currentValidationError.email}</div>)}
        </div>
        <div className="signup-form-content-item signup-form-content-password">
          <label htmlFor="password" className="signup-form-content-item-label">Password</label>
          <input type="password" name="password" id="password" className="signup-form-content-item-input" placeholder="enter your password..." value={currentUserSignupStatus.password} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent}/>
        {(currentValidationError.password && <div className="input-error">{currentValidationError.password}</div>)}
        </div>
        <div className="signup-form-content-item signup-form-content-password-confirm">
          <label htmlFor="confirm" className="signup-form-content-item-label">Password Confirm</label>
          <input type="password" name="confirm" id="confirm" className="signup-form-content-item-input" placeholder="enter your password again..." value={currentUserSignupStatus.confirm} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent}/>
        {(currentValidationError.confirm && <div className="input-error">{currentValidationError.confirm}</div>)}
        </div>
        <div className="signup-form-content-btn-wrapper">
          <input className="signup-form-content-btn" type="button" onClick={handleSubmitClickEvent} value="Signup" />
        </div>
      </form>
    </div>
  );
}

export default Signup;



