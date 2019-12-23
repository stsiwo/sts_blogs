import { initialUserSignupStatus, UserSignupType, UserType, UserSignupRequestDataType } from 'domain/user/UserType';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { RequestMethodEnum, ResponseResultStatusEnum, UserResponseDataType, ResponseResultType } from 'requests/types';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { useRequest } from 'Hooks/Request/useRequest';
import { useUserSignupValidation } from 'Hooks/Validation/UserSignup/useUserSignupValidation';
import './Signup.scss';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
import Input from 'Components/Input/Input';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useKeyupListener } from 'Hooks/KeyupListener/useKeyupListener';
var debug = require('debug')('ui:Signup')

const Signup: React.FunctionComponent<RouteComponentProps<{}>> = (props: RouteComponentProps<{}>) => {

  const [currentUserSignupStatus, setUserSignupStatus] = React.useState<UserSignupType>(initialUserSignupStatus)
  const { currentRequestStatus, setRequestStatus, sendRequest } = useRequest({})
  const { currentValidationError, touch, validate } = useUserSignupValidation({ domain: currentUserSignupStatus })
  const { authDispatch } = useAuthContext()
  

  const handleInputChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    currentUserSignupStatus[e.currentTarget.name as keyof UserSignupType] = e.currentTarget.value
    setUserSignupStatus({
      ...currentUserSignupStatus
    })
  }
  const handleInitialFocusEvent: React.EventHandler<React.FocusEvent<HTMLInputElement>> = (e) => {
    touch(e.currentTarget.name)
  }

  const _submitSignupForm: () => void = () => {
    // extract 'confirm' for request data
    const tempUserSignupData: UserSignupType = Object.assign({}, currentUserSignupStatus)
    delete tempUserSignupData.confirm
    const userSignupRequestData: UserSignupRequestDataType = tempUserSignupData as UserSignupRequestDataType
    // final check validation ...
    validate()
      .then(() => {
        debug('validation passed')
        sendRequest({
          path: '/signup',
          method: RequestMethodEnum.POST,
          headers: { 'content-type': 'application/json' },
          data: JSON.stringify(userSignupRequestData),
        })
          .then((result: ResponseResultType<UserResponseDataType>) => {
            // this 'then' block is called only when request success
            if (result.status === ResponseResultStatusEnum.SUCCESS) {
              debug('got response with user data')
              debug(result)
              authDispatch({
                type: 'login',
                user: result.data.user as UserType
              })
              console.log('before redirect')
              props.history.push('/')
            }
          })
      }, () => {
        debug('validation failed at save button event handler')
      })
  }

  useKeyupListener({
    keyType: 'Enter',
    listener: _submitSignupForm
  })

  const handleSubmitClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = async (e) => {
    _submitSignupForm()
  }

  return (
    <div className="signup-form-cover">
      <h2 className="signup-form-title">Signup</h2>
      <FetchStatus
        currentFetchStatus={currentRequestStatus}
        setFetchStatus={setRequestStatus}
        fetchingMsg={'requesting user signup ...'}
        successMsg={'requesting user signup success'}
        failureMsg={'requesting user signup failed'}
      />
      <form className="signup-login-form-content">
        <Input
          id={"name"}
          inputStyle={"black-input"}
          inputValue={currentUserSignupStatus.name}
          label={"Name"}
          name={"name"}
          onInputChange={handleInputChangeEvent}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter your name..."}
          errorMsg={currentValidationError.name}
          errorStyle={'name-error small-input-error'}
        />
        <Input
          id={"email"}
          inputStyle={"black-input"}
          inputValue={currentUserSignupStatus.email}
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
          inputValue={currentUserSignupStatus.password}
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
          inputValue={currentUserSignupStatus.confirm}
          label={"Confirm"}
          name={"confirm"}
          onInputChange={handleInputChangeEvent}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter your password again ..."}
          errorMsg={currentValidationError.confirm}
          errorStyle={'small-input-error'}
          inputType={'password'}
        />
        <div className="signup-login-link-wrapper">
          <span>if you alreay have account, </span><Link to='/login' >Login Page</Link>
        </div>
        <div className="signup-form-content-btn-wrapper">
          {(currentValidationError.submit && <div className="summary-error small-input-error">{currentValidationError.submit}</div>)}
          <input className="btn" type="button" onClick={handleSubmitClickEvent} value="Signup" role="signup-btn" />
        </div>
      </form>
    </div>
  );
}

export default withRouter(Signup);



