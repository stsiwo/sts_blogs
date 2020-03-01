import { useValidation } from '../useValidation';
import { UseForgotPasswordValidationStatusInputType, UseForgotPasswordValidationStatusOutputType } from './types';
import { ForgotPasswordType } from 'domain/user/UserType';
import * as yup from 'yup'

export const useForgotPasswordValidation = (input: UseForgotPasswordValidationStatusInputType): UseForgotPasswordValidationStatusOutputType => {


  // define validation schema
  let schema = yup.object().shape<ForgotPasswordType>({
    email: yup.string().email().required(),
  });

  const { currentValidationError, touch, validate } = useValidation<ForgotPasswordType>({
    domain: input.domain,
    schema: schema
  })

  return {
    currentValidationError: currentValidationError,
    touch: touch,
    validate: validate,
  }
}
