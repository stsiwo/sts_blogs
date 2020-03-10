import { useValidation } from '../useValidation';
import { UseUserSignupValidationStatusInputType, UseUserSignupValidationStatusOutputType } from './types';
import { UserSignupType } from 'domain/user/UserType';
import * as yup from 'yup'
import { logger } from 'configs/logger';
import { Subject, from } from 'rxjs';
import { debounceTime, tap, distinctUntilChanged, filter, switchMap, map, take } from 'rxjs/operators';
import { useRequest } from 'Hooks/Request/useRequest';
import { RequestMethodEnum, ResponseResultType, ResponseResultStatusEnum } from 'requests/types';
import * as React from 'react';
import { appConfig } from 'configs/appConfig';
const log = logger("useUserSignupValidation")

export const useUserSignupValidation = (input: UseUserSignupValidationStatusInputType): UseUserSignupValidationStatusOutputType => {

  const { currentRequestStatus, setRequestStatus, sendRequest } = useRequest({})
  // define validation schema
  let schema = yup.object().shape<UserSignupType>({
    name: yup.string().required(),
    email: yup.string().test(
      "email-check", // check input email is registered or not
      "oops. provided email is not registered.",
      async (email: string) => {
        const obs$ = new Subject<string>()
        // one time only (create observable every time this function is called
        const subs = obs$.pipe(
          //map((event: Event) => (event.currentTarget as HTMLInputElement).value),
          debounceTime(appConfig.debounceTime),
          tap((value: string) => log("passed debounceTime with: " + value)),
          distinctUntilChanged(),
          tap((value: string) => log("passed distinctUntilChanged with: " + value)),
          filter((value: string) => {
            // email validation for filtering 
            log("email valid filter at type ahead for email check")
            const tmpSchema = yup.string().email()
            if (value && tmpSchema.isValidSync(value)) return true
            else {
              // force to call complete since this promise can't be resolved and can't return anything at 'then' clause
              obs$.complete()
              log("failed email validation at typeahead pipeline")
              return false
            }
          }),
          tap((value: string) => log("passed filter with: " + value)),
          switchMap((value: string) => {
            log("switchMap before request")
            return from(sendRequest({
              path: "/user-email-check",
              method: RequestMethodEnum.POST, 
              headers: { 'content-type': 'application/json' },
              data: JSON.stringify({ email: value }),
              allowCache: false,
              useCache: false
            }))
          }),
          tap((value: ResponseResultType) => log("passed switchMap with: " + value)),
          map((response: ResponseResultType) => {
            log("got received response")
            // refer: ResponseResultStatusEnum
            // not Axios (or api status code)
            return response.status as number
          }),
          map((status: number) => {
            log("return only status code: " + status)
            return status
          }),
          tap((value: number) => log("passed final filter with: " + value)),
          // automatic subscription and unsubscription when complete its task
          take(1)
        ).toPromise()
        obs$.next(email)

        return await subs.then((value: number) => {
          // if this stream is completed before api reqeust, this 'value' hold 'undefined'
          log("then after observable promise: " + value)
          return value === ResponseResultStatusEnum.SUCCESS ? true : false
        }).catch(() => false)
        //return false
      }).email().required(),
    password: yup.string().required(),
    confirm: yup.string().required().oneOf([yup.ref('password'), null], 'passwords must match')
  });

  const { currentValidationError, touch, validate, validationSummaryCheck, currentTouch } = useValidation<UserSignupType>({
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
    currentTouch: currentTouch,
    typeAheadStatus: currentRequestStatus
  }
}
