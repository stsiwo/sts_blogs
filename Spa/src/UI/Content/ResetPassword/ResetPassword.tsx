import { initialUserResetPasswordStatus, UserResetPasswordType, UserType, UserResetPasswordRequestDataType } from 'domain/user/UserType';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { RequestMethodEnum, ResponseResultStatusEnum, UserResponseDataType, ResponseResultType } from 'requests/types';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { useRequest } from 'Hooks/Request/useRequest';
import { useUserResetPasswordValidation } from 'Hooks/Validation/UserResetPassword/useUserResetPasswordValidation';
import './ResetPassword.scss';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
import { useDispatch } from 'react-redux';
import Input from 'Components/Input/Input';
import { useRouteMatch, useLocation, useParams } from 'react-router';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useKeyupListener } from 'Hooks/KeyupListener/useKeyupListener';
import { logger } from 'configs/logger';
import cloneDeep = require('lodash/cloneDeep');
const log = logger("ResetPassword");

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword: React.FunctionComponent<RouteComponentProps<{}>> = (props: RouteComponentProps<{}>) => {

  let query = useQuery();
  const [currentUserResetPasswordStatus, setUserResetPasswordStatus] = React.useState<UserResetPasswordType>(initialUserResetPasswordStatus)
  const { currentRequestStatus, setRequestStatus, sendRequest } = useRequest({})
  const { currentValidationError, touch, validate, validationSummaryCheck, currentTouch } = useUserResetPasswordValidation({ domain: currentUserResetPasswordStatus })
  const { auth, authDispatch } = useAuthContext()
  const { url, path } = useRouteMatch()

  const handleInputChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    log("start handling input change")
    const targetName = e.currentTarget.name
    const targetValue = e.currentTarget.value
    const tmpUserResetPasswordStatus = cloneDeep(currentUserResetPasswordStatus)
    tmpUserResetPasswordStatus[targetName as keyof UserResetPasswordType] = targetValue
    setUserResetPasswordStatus({
      ...tmpUserResetPasswordStatus
    })
  }

  const handleInitialFocusEvent: React.EventHandler<React.FocusEvent<HTMLInputElement>> = (e) => {
    touch(e.currentTarget.name)
  }

  const _submitResetPasswordForm: () => void = () => {
    // final check validation ...
    if (validationSummaryCheck()) {
      log('validation passed')
      sendRequest({
        path: '/password-reset?token=' + query.get("token"),
        method: RequestMethodEnum.POST,
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify({
          password: currentUserResetPasswordStatus.password
        })
      })
        .then((result: ResponseResultType<{}>) => {
        })
    }
  }

  useKeyupListener({
    keyType: 'Enter',
    listener: _submitResetPasswordForm
  })

  const handleSubmitClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = async (e) => {
    log('clicked update butuon')
    _submitResetPasswordForm()
  }

  return (
    <div className="login-form-cover">
      <h2 className="page-title-center">Reset Password</h2>
      <FetchStatus
        currentFetchStatus={currentRequestStatus}
        setFetchStatus={setRequestStatus}
        fetchingMsg={'requesting reset password ...'}
        successMsg={'requesting reset password success'}
        failureMsg={'requesting reset password failed'}
      />
      <form className="signup-login-form-content">
        <Input
          id={"password"}
          inputStyle={"black-input"}
          inputValue={currentUserResetPasswordStatus.password}
          label={"Password"}
          name={"password"}
          onInputChange={handleInputChangeEvent}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter your password..."}
          errorMsg={currentTouch.password ? currentValidationError.password : null}
          errorStyle={'password-error small-input-error'}
          inputType={'password'}
        />
        <Input
          id={"confirm"}
          inputStyle={"black-input"}
          inputValue={currentUserResetPasswordStatus.confirm}
          label={"Confirm"}
          name={"confirm"}
          onInputChange={handleInputChangeEvent}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter your password again ..."}
          errorMsg={currentTouch.confirm ? currentValidationError.confirm : null}
          errorStyle={'confirm-error small-input-error'}
          inputType={'password'}
        />
        <div className="signup-login-link-wrapper">
          <span>Move to </span><Link to={`/login`} >Login Page</Link><span> after successfully reset your password</span>
        </div>
        <div className="login-form-content-btn-wrapper">
          {(currentValidationError.submit && <div className="summary-error small-input-error">{currentValidationError.submit}</div>)}
          <input className="btn" type="button" onClick={handleSubmitClickEvent} value="Reset Password" role="reset-password-btn" />
        </div>
      </form>
    </div >
  );
}

export default withRouter(ResetPassword);



