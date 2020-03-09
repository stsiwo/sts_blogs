import { useValidation } from '../useValidation';
import { UseUserSignupValidationStatusInputType, UseUserSignupValidationStatusOutputType } from './types';
import { UserSignupType } from 'domain/user/UserType';
import * as yup from 'yup'

export const useUserSignupValidation = (input: UseUserSignupValidationStatusInputType): UseUserSignupValidationStatusOutputType => {


  // define validation schema
  let schema = yup.object().shape<UserSignupType>({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm: yup.string().required().oneOf([yup.ref('password'), null], 'passwords must match')
  });

  const { currentValidationError, touch, validate, validationSummaryCheck } = useValidation<UserSignupType>({
    domain: input.domain,
    schema: schema,
  })

  return {
    currentValidationError: currentValidationError,
    touch: touch,
    validate: validate,
    validationSummaryCheck: validationSummaryCheck
  }
}
