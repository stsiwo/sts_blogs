import { useValidation } from '../useValidation';
import { UseUserLoginValidationStatusInputType, UseUserLoginValidationStatusOutputType } from './types';
import { UserLoginType } from 'domain/user/UserType';
import * as yup from 'yup'
import { useTypeAhead } from 'Hooks/TypeAhead/useTypeAhead';
import { RequestMethodEnum, ResponseResultStatusEnum } from 'requests/types';
import { logger } from 'configs/logger';
const log = logger("useUserLoginValidation")

export const useUserLoginValidation = (input: UseUserLoginValidationStatusInputType): UseUserLoginValidationStatusOutputType => {


  const { subject$: emailSubject$, currentRequestStatus: curTypeAheadRequestStatus } = useTypeAhead({
    url: "/user-email-check",
    method: RequestMethodEnum.GET
  })
  // define validation schema
  let schema = yup.object().shape<UserLoginType>({
    email: yup.string().email().required().test(
      "email-check", // check input email is registered or not
      "oops. provided email is not registered.",
      async (email: string) => {
        await emailSubject$.next(email) 
        const isEmailExist: boolean = (curTypeAheadRequestStatus.status === ResponseResultStatusEnum.SUCCESS) ? true : false
        return isEmailExist  
      }
    ),
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
