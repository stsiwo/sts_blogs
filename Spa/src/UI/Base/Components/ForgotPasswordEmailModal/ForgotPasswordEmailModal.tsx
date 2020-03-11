import * as React from 'react';
import './ForgotPasswordEmailModal.scss';
import { ForgotPasswordEmailModalPropType } from './types';
import { Link } from 'react-router-dom';
import Input from 'Components/Input/Input';
import { useForgotPasswordValidation } from 'Hooks/Validation/ForgotPassword/useForgotPasswordValidation';
import { ForgotPasswordType, initialForgotPasswordStatus } from 'domain/user/UserType';
import { useRequest } from 'Hooks/Request/useRequest';
import { RequestMethodEnum, ResponseResultType, ResponseResultStatusEnum } from 'requests/types';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { logger } from 'configs/logger';
import cloneDeep = require('lodash/cloneDeep');
const log = logger("ForgotPasswordModal");


const ForgotPasswordEmailModal: React.FunctionComponent<ForgotPasswordEmailModalPropType> = (props: ForgotPasswordEmailModalPropType) => {

  const [currentForgotPasswordStatus, setForgotPasswordStatus] = React.useState<ForgotPasswordType>(initialForgotPasswordStatus)
  const { currentValidationError, touch, validate, validationSummaryCheck, currentTouch, typeAheadStatus } = useForgotPasswordValidation({ domain: currentForgotPasswordStatus })
  const { currentRequestStatus: currentForgotPasswordRequestStatus, setRequestStatus: setForgotPasswordRequestStatus, sendRequest: sendForgotPasswordRequest } = useRequest({})

  const handleInputChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    const tmpForgotPasswordStatus = cloneDeep(currentForgotPasswordStatus)
    tmpForgotPasswordStatus[e.currentTarget.name as keyof ForgotPasswordType] = e.currentTarget.value
    setForgotPasswordStatus({
      ...tmpForgotPasswordStatus
    })
  }

  const handleInitialFocusEvent: React.EventHandler<React.FocusEvent<HTMLInputElement>> = (e) => {
    touch(e.currentTarget.name)
  }

  const handleSubmitClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = async (e) => {
    log('clicked update butuon')
    if (validationSummaryCheck()) {
      log('validation passed')
      sendForgotPasswordRequest({
        path: '/forgot-password',
        method: RequestMethodEnum.POST,
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify({ email: currentForgotPasswordStatus.email })
      })
        .then((result: ResponseResultType<{}>) => {
        })
    }
  }

  return (
    <div className="forgot-password-email-modal-wrapper" role="forgot-password-email-modal">
      <h1 className="forgot-password-email-modal-title">Forgot Password Request</h1>
      <p className="forgot-password-email-modal-sentence">Please enter your registered email address</p>
      <form className="signup-login-form-content">
        <Input
          id={"forgot-password-email"}
          inputStyle={"white-input"}
          inputValue={currentForgotPasswordStatus.email}
          label={"Email"}
          labelStyle={"white-input-label"}
          name={"email"}
          onInputChange={handleInputChangeEvent}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter your email..."}
          errorMsg={currentTouch.email ? currentValidationError.email : null}
          errorStyle={'email-error'}
          typeAhead={true}
          typeAheadStatus={typeAheadStatus}
        />
      </form>
      <FetchStatus
        currentFetchStatus={currentForgotPasswordRequestStatus}
        setFetchStatus={setForgotPasswordRequestStatus}
        fetchingMsg={'requesting forgot password ...'}
        successMsg={'requesting forgot password success. please check your email box.'}
        failureMsg={'requesting forgot password failed'}
      />
      <div className="login-form-content-btn-wrapper">
        {(currentValidationError.submit && <div className="summary-error small-input-error">{currentValidationError.submit}</div>)}
        <input className="white-btn" type="button" onClick={handleSubmitClickEvent} value="Send Request" role="forgot-password-btn" />
      </div>
      <Link to={`/login`} className="forgot-password-email-modal-close-icon" role='close-forgot-password-modal-link'>
        <IoMdCloseCircleOutline className="raw-icon" />
      </Link>
    </div>
  );
}

export default ForgotPasswordEmailModal;
