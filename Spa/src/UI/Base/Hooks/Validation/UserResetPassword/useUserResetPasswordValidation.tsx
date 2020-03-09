import { useValidation } from '../useValidation';
import { UseUserResetPasswordValidationStatusInputType, UseUserResetPasswordValidationStatusOutputType } from './types';
import { UserResetPasswordType } from 'domain/user/UserType';
import * as yup from 'yup'

export const useUserResetPasswordValidation = (input: UseUserResetPasswordValidationStatusInputType): UseUserResetPasswordValidationStatusOutputType => {


  // define validation schema
  let schema = yup.object().shape<UserResetPasswordType>({
    password: yup.string().required(),
    confirm: yup.string().required().oneOf([yup.ref('password'), null], 'passwords must match')
  });

  const { currentValidationError, touch, validate, validationSummaryCheck } = useValidation<UserResetPasswordType>({
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
