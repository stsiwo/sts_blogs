import { useValidation } from '../useValidation';
import { UseUserResetPasswordValidationStatusInputType, UseUserResetPasswordValidationStatusOutputType } from './types';
import { UserResetPasswordType } from 'domain/user/UserType';
import * as yup from 'yup'
import * as React from 'react';
import { logger } from 'configs/logger';
const log = logger("useUserResetPasswordValidation")

export const useUserResetPasswordValidation = (input: UseUserResetPasswordValidationStatusInputType): UseUserResetPasswordValidationStatusOutputType => {


  // define validation schema
  let schema = yup.object().shape<UserResetPasswordType>({
    password: yup.string().required(),
    confirm: yup.string().required().oneOf([yup.ref('password'), null], 'passwords must match')
  });

  const { currentValidationError, touch, validate, validationSummaryCheck, currentTouch } = useValidation<UserResetPasswordType>({
    domain: input.domain,
    schema: schema,
  })

  React.useEffect(() => {
    // if password validation, trigger confirm validation too
    log("start confirm valdation since password has changed")
    validate('confirm', input.domain)

  }, [currentValidationError.confirmTriggerCounter])

  return {
    currentValidationError: currentValidationError,
    touch: touch,
    validate: validate,
    validationSummaryCheck: validationSummaryCheck,
    currentTouch: currentTouch
  }
}
