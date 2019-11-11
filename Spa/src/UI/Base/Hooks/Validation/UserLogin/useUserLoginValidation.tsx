import { useValidation } from '../useValidation';
import { UseUserLoginValidationStatusInputType, UseUserLoginValidationStatusOutputType } from './types';
import { UserLoginType } from '../../../../../domain/user/UserType';
import * as yup from 'yup'

export const useUserLoginValidation = (input: UseUserLoginValidationStatusInputType): UseUserLoginValidationStatusOutputType => {


  // define validation schema
  let schema = yup.object().shape<UserLoginType>({
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm: yup.string().required().oneOf([yup.ref('password'), null], 'passwords must match')
  });

  const { currentValidationError, touch, validate } = useValidation<UserLoginType>({
    domain: input.domain,
    schema: schema
  })

  return {
    currentValidationError: currentValidationError,
    touch: touch,
    validate: validate,
  }
}
