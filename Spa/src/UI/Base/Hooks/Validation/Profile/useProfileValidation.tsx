import { useValidation } from '../useValidation';
import { UseProfileValidationStatusInputType, UseProfileValidationStatusOutputType } from './types';
import { UserType, UserProfileType } from 'domain/user/UserType';
import * as yup from 'yup'
import * as React from 'react';
import { logger } from 'configs/logger';
const log = logger("useProfileValidation")


export const useProfileValidation = (input: UseProfileValidationStatusInputType): UseProfileValidationStatusOutputType => {


  // define validation schema
  let schema = yup.object().shape<UserProfileType>({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string(),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'passwords must match')
  });

  const { currentValidationError, touch, validate, validationSummaryCheck, currentTouch } = useValidation<UserProfileType>({
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

