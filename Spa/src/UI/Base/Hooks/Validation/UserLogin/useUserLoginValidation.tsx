import { useValidation } from '../useValidation';
import { UseUserLoginValidationStatusInputType, UseUserLoginValidationStatusOutputType } from './types';
import { UserLoginType, UserLoginValidationSchemaType, UserCredentialValidationSchemaType } from 'domain/user/UserType';
import * as yup from 'yup'
import { useTypeAhead } from 'Hooks/TypeAhead/useTypeAhead';
import { RequestMethodEnum, ResponseResultStatusEnum, ResponseResultType } from 'requests/types';
import { logger } from 'configs/logger';
import { BehaviorSubject, from, Subject, AsyncSubject, interval, fromEvent, Observable } from 'rxjs';
import * as React from 'react';
import { useRequest } from 'Hooks/Request/useRequest';
import { debounceTime, distinctUntilChanged, map, switchMap, defaultIfEmpty, tap, mergeMap, take, takeWhile, filter } from 'rxjs/operators';
import { appConfig } from 'configs/appConfig';
const log = logger("useUserLoginValidation")

export const useUserLoginValidation = (input: UseUserLoginValidationStatusInputType): UseUserLoginValidationStatusOutputType => {

  const { currentRequestStatus, setRequestStatus, sendRequest } = useRequest({})

  // define validation schema
  /**
   * the order of validation error message is displayed is backward.
   * ex)
   *  - yup.string().val1().val2().val3()
   *  - val3 error message is display first and val1 mesage is the last
   **/
  const emailInputRef = React.useRef<HTMLInputElement>(null)

  //const [curObs$, setObs] = React.useState<Observable<any>>(fromEvent(document.getElementById('email'), 'change'));

  //const [curObs$, setObs] = React.useState<Observable<any>>(fromEvent(document.getElementById('email'), 'input'));

  /**
   * use async setSTate for result of rxjs
   *  - setState inside subscirbe with await
   *  - await the setState update inside yup.test()
   **/

  //React.useEffect(() => {
  //  const subscription = curObs$.pipe(
  //    map((event: Event) => (event.currentTarget as HTMLInputElement).value),
  //    tap((value: string) => log("before filtered email address: " + value)),
  //    debounceTime(1000),
  //    distinctUntilChanged(),
  //    tap((value: string) => log("filtered email address: " + value)),
  //  ).subscribe(async (value: string) => {
  //  })
  //  return () => subscription.unsubscribe()
  //}, [])

  let schema = yup.object().shape<UserLoginType>({
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
    //email: yup.string().test(
    //  "email-check", // check input email is registered or not
    //  "oops. provided email is not registered.",
    //  async (email: string) => {
    //    log("start testing email type ahead")
    //    let filteredEmail: string = null



    //    log("return result before finishing test email")
    //    return await customDebounceTime(1000).then(() => {
    //      log("start send type ahead request after debounce")
    //      return sendRequest({
    //        path: "/test",
    //        method: RequestMethodEnum.GET
    //      })
    //        .then((response: ResponseResultType) => {
    //          log("after type ahead request, receiving response with value: " + response.status)
    //          return response.status === ResponseResultStatusEnum.SUCCESS ? true : false
    //        })
    //    })
    //  }
    //).email().required(),
    email: yup.string().test(
      "email-check", // check input email is registered or not
      "oops. provided email is not registered.",
      async (email: string) => {
        const obs$ = new Subject<string>()
        // one time only (create observable every time this function is called
        const subs = obs$.pipe(
          //map((event: Event) => (event.currentTarget as HTMLInputElement).value),
          defaultIfEmpty<string, boolean>(false),
          tap((value: string) => log("passed deafultIfEmpty with: " + value)),
          debounceTime(1000),
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
              path: "/test-type-ahead",
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
          return value === 204 ? true : false
        }).catch(() => false)
        //return false
      }).email().required(),
    password: yup.string().required(),
    /**
     * use test() function & context to validate password match
     *  - this is because validation separately for each field rather than all at once
     **/
    confirm: yup.string().required().oneOf([yup.ref('password'), null], 'passwords must match')
    //credential: yup.object().shape<UserCredentialValidationSchemaType>({
    //  password: yup.string().required(),
    //  /**
    //   * use test() function & context to validate password match
    //   *  - this is because validation separately for each field rather than all at once
    //   **/
    //  confirm: yup.string().required().oneOf([yup.ref('password'), null], 'passwords must match')
    //})
    //confirm: yup.string().required().test(
    //  'match-with-password',
    //  'must match with password',
    //  function test(value: string) {
    //    // this condition is necessary when other validate function does not use 'context: { password: xxxx }'
    //    if (this.options.context && (this.options.context as any).user.password)
    //      return (this.options.context as any).user.password === value
    //    else 
    //      return false
    //  }
    //)
  });

  const { currentValidationError, touch, validate, validationSummaryCheck, currentTouch } = useValidation<UserLoginType>({
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
    currentTouch: currentTouch,
    validate: validate,
    validationSummaryCheck: validationSummaryCheck,
    emailInputRef: emailInputRef
  }
}

async function customDebounceTime(ms: number) {
  log("start customDebounceTime with ms: " + ms)
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}
