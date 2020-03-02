import { useValidation } from '../useValidation';
import { UseForgotPasswordValidationStatusInputType, UseForgotPasswordValidationStatusOutputType } from './types';
import { ForgotPasswordType } from 'domain/user/UserType';
import * as yup from 'yup'
import { useTypeAhead } from 'Hooks/TypeAhead/useTypeAhead';
import { RequestMethodEnum, ResponseResultStatusEnum } from 'requests/types';

export const useForgotPasswordValidation = (input: UseForgotPasswordValidationStatusInputType): UseForgotPasswordValidationStatusOutputType => {


  const { subject$: emailSubject$, currentRequestStatus: curTypeAheadRequestStatus } = useTypeAhead({
    url: "/user-email-check",
    method: RequestMethodEnum.GET
  })
  // define validation schema
  let schema = yup.object().shape<ForgotPasswordType>({
    /**
     * integrate with type ahead feature
     *  - check provided email is registsered.
     *  - avoid every key stroke causes request (debounceTime)
     **/
    email: yup.string().email().required().test(
      "email-check", // check input email is registered or not
      "oops. provided email is not registered.",
      async (email: string) => {
        await emailSubject$.next(email) 
        const isEmailExist: boolean = (curTypeAheadRequestStatus.status === ResponseResultStatusEnum.SUCCESS) ? true : false
        return isEmailExist  
      }
    )
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
