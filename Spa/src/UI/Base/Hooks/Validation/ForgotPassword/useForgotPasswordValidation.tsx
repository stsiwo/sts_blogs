import { useValidation } from '../useValidation';
import { UseForgotPasswordValidationStatusInputType, UseForgotPasswordValidationStatusOutputType } from './types';
import { ForgotPasswordType } from 'domain/user/UserType';
import * as yup from 'yup'
import { useTypeAhead } from 'Hooks/TypeAhead/useTypeAhead';
import { RequestMethodEnum, ResponseResultStatusEnum } from 'requests/types';

export const useForgotPasswordValidation = (input: UseForgotPasswordValidationStatusInputType): UseForgotPasswordValidationStatusOutputType => {


  const { subject$: emailSubject$, currentRequestStatus: curTypeAheadRequestStatus } = useTypeAhead({
    url: "/user-email-check",
    method: RequestMethodEnum.GET,
    headers: { 'content-type': 'application/json' },
    dataBuilder: (email: string) => JSON.stringify({ email: email })
  })
  // define validation schema
  /**
   * the order of validation error message is displayed is backward.
   * ex)
   *  - yup.string().val1().val2().val3()
   *  - val3 error message is display first and val1 mesage is the last
   **/
  // define validation schema
  let schema = yup.object().shape<ForgotPasswordType>({
    /**
     * refactor: dispatch request only when all the other validation of email passed.
     * ex)
     *  email validation: 
     *    1. check not empty
     *    2. check valid email format
     *    3. finally send request the email exists in db
     * - current implementation (default yup implementation): does parallel validation for each validation for a field.
     * - for now skip!!
     **/

    /**
     * integrate with type ahead feature
     *  - check provided email is registsered.
     *  - avoid every key stroke causes request (debounceTime)
     **/
    email: yup.string().test(
      "email-check", // check input email is registered or not
      "oops. provided email is not registered.",
      async (email: string) => {
        await emailSubject$.next(email) 
        const isEmailExist: boolean = (curTypeAheadRequestStatus.status === ResponseResultStatusEnum.SUCCESS) ? true : false
        return isEmailExist  
      }
    ).email().required(),
  });

  const { currentValidationError, touch, validate, validationSummaryCheck } = useValidation<ForgotPasswordType>({
    domain: input.domain,
    schema: schema
  })

  return {
    currentValidationError: currentValidationError,
    touch: touch,
    validate: validate,
    validationSummaryCheck: validationSummaryCheck
  }
}
