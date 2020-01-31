import { useValidation } from '../useValidation';
import { UseProfileValidationStatusInputType, UseProfileValidationStatusOutputType } from './types';
import { UserType } from 'domain/user/UserType';
import * as yup from 'yup'

export const useProfileValidation = (input: UseProfileValidationStatusInputType): UseProfileValidationStatusOutputType => {


  // define validation schema
  let schema = yup.object().shape<UserType>({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string(),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'passwords must match')
  });

  const { currentValidationError, touch, validate } = useValidation<UserType>({
    domain: input.domain,
    schema: schema
  })

  return {
    currentValidationError: currentValidationError,
    touch: touch,
    validate: validate,
  }
}

