import * as React from 'react';
import './Login.scss';
import { UserLoginType, initialUserLoginStatus } from '../../../domain/user/UserType';
import { UserLoginValidationType, UserLoginInputTouchedType, initialUserLoginInputTouchedState, initialUserLoginValidationState } from '../../../domain/user/UserValidationType';
import { ResponseResultType, ResponseResultStatusEnum, RequestMethodEnum } from '../../../requests/types';
import * as yup from 'yup'
import { request } from '../../../requests/request';

const Login: React.FunctionComponent<{}> = (props: {}) => {

  const [currentUserLoginStatus, setUserLoginStatus] = React.useState<UserLoginType>(initialUserLoginStatus)
  const [currentValidationError, setValidationError] = React.useState<UserLoginValidationType>(initialUserLoginValidationState)
  const [currentInputTouched, setInputTouched] = React.useState<UserLoginInputTouchedType>(initialUserLoginInputTouchedState)

  const [currentLoginRequestStatus, setLoginRequestStatus] = React.useState<ResponseResultType>({
    status: ResponseResultStatusEnum.INITIAL
  })

  let schema = yup.object().shape<UserLoginType>({
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm: yup.string().required().oneOf([yup.ref('password'), null], 'passwords must match')
  });

  React.useEffect(() => {
    function validateFormInput() {
      schema
        .validate(currentUserLoginStatus, {
          abortEarly: false
        })
        .then(() => {
          console.log('validation passed')
          setValidationError({
            ...initialUserLoginValidationState
          })
        })
        .catch((error: yup.ValidationError) => {
          console.log('validation error detected')
          console.log(error)
          // clear all of error message first
          for (let key in currentValidationError) delete currentValidationError[key as keyof UserLoginType]
          // assign new error message 
          error.inner.forEach((eachError: yup.ValidationError) => {
            if (currentInputTouched[eachError.path as keyof UserLoginType])
              currentValidationError[eachError.path as keyof UserLoginType] = eachError.message
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
      ...Object.values(currentUserLoginStatus),
      ...Object.values(currentInputTouched) // for update when input focus
    ]);

  const handleInputChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    currentUserLoginStatus[e.currentTarget.name as keyof UserLoginType] = e.currentTarget.value
    setUserLoginStatus({
      ...currentUserLoginStatus
    })
  }

  const handleInitialFocusEvent: React.EventHandler<React.FocusEvent<HTMLInputElement>> = (e) => {
    console.log(e.currentTarget.name)
    console.log(e.currentTarget.value)
    currentInputTouched[e.currentTarget.name as keyof UserLoginValidationType] = true
    setInputTouched({
      ...currentInputTouched
    })
  }

  const handleSubmitClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = async (e) => {
    console.log('clicked update butuon')
    // final check validation ...
    schema.validate(currentUserLoginStatus, {
      abortEarly: false 
    })
      .then(async () => {
        console.log('validation passed')

        // set headers (multipart/form-data)
        const headers: {} = { 'content-type': 'application/json' }

        setLoginRequestStatus({
          status: ResponseResultStatusEnum.FETCHING
        })
        // send request
        await request({
          url: '/login',
          method: RequestMethodEnum.POST,
          headers: headers,
          data: JSON.stringify(currentUserLoginStatus)
        })
          .then((responseResult: ResponseResultType) => {
            setLoginRequestStatus({
              status: responseResult.status
            })
          })
          .catch((responseResult: ResponseResultType) => {
            setLoginRequestStatus({
              status: responseResult.status,
              errorMsg: responseResult.errorMsg
            })
          })
      })
      .catch((error: yup.ValidationError) => {
        console.log('validation failed')
        console.log(error)
        error.inner.forEach((eachError: yup.ValidationError) => {
          currentValidationError[eachError.path as keyof UserLoginType] = eachError.message
        })
        setValidationError({
          ...currentValidationError
        })
        return false
      })
  }

  return (
    <div className="login-form-cover">
      <h2 className="login-form-title">Login Form</h2>
      {(currentLoginRequestStatus.status === ResponseResultStatusEnum.FETCHING && <p>requesting user login ...</p>)}
      {(currentLoginRequestStatus.status === ResponseResultStatusEnum.SUCCESS && <p>requesting user login success</p>)}
      {(currentLoginRequestStatus.status === ResponseResultStatusEnum.FAILURE && <p>requesting user login failed</p>)}
      <form className="login-form-content">
        <div className="login-form-content-item login-form-content-email">
          <label htmlFor="email" className="login-form-content-item-label">Email</label>
          <input type="email" name="email" id="email" className="login-form-content-item-input" placeholder="enter your email..." value={currentUserLoginStatus.email} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent}/>
        {(currentValidationError.email && <div className="input-error">{currentValidationError.email}</div>)}
        </div>
        <div className="login-form-content-item login-form-content-password">
          <label htmlFor="password" className="login-form-content-item-label">Password</label>
          <input type="password" name="password" id="password" className="login-form-content-item-input" placeholder="enter your password..." value={currentUserLoginStatus.password} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent}/>
        {(currentValidationError.password && <div className="input-error">{currentValidationError.password}</div>)}
        </div>
        <div className="login-form-content-item login-form-content-password-confirm">
          <label htmlFor="confirm" className="login-form-content-item-label">Password Confirm</label>
          <input type="password" name="confirm" id="confirm" className="login-form-content-item-input" placeholder="enter your password again..." value={currentUserLoginStatus.confirm} onFocus={handleInitialFocusEvent} onChange={handleInputChangeEvent}/>
        {(currentValidationError.confirm && <div className="input-error">{currentValidationError.confirm}</div>)}
        </div>
        <div className="login-form-content-btn-wrapper">
          <input className="regular-btn signup-form-content-btn" type="button" onClick={handleSubmitClickEvent} value="Login"/>
        </div>
      </form>
    </div>
  );
}

export default Login;


