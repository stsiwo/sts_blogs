import { useValidation } from '../useValidation';
import { UseUserLoginValidationStatusInputType, UseUserLoginValidationStatusOutputType } from './types';
import { UserLoginType } from 'domain/user/UserType';
import * as yup from 'yup'
import { useTypeAhead } from 'Hooks/TypeAhead/useTypeAhead';
import { RequestMethodEnum, ResponseResultStatusEnum, ResponseResultType } from 'requests/types';
import { logger } from 'configs/logger';
import { BehaviorSubject, from, Subject, AsyncSubject, interval, fromEvent, Observable } from 'rxjs';
import * as React from 'react';
import { useRequest } from 'Hooks/Request/useRequest';
import { debounceTime, distinctUntilChanged, map, switchMap, defaultIfEmpty, tap, mergeMap, take } from 'rxjs/operators';
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

  const [curObs$, setObs] = React.useState<Observable<Event>>(fromEvent(document.getElementById("email"), 'change'));

  React.useEffect(() => {
    const obs$ = fromEvent(document.getElementById("email"), 'change')
    curObs$.pipe(
      map((event: Event) => (event.currentTarget as HTMLInputElement).value),
      debounceTime(1000),
      distinctUntilChanged(),
    )

  }, [])


  /**
   * use async setSTate for result of rxjs
   *  - setState inside subscirbe with await
   *  - await the setState update inside yup.test()
   **/
  const testFlag: boolean = true

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

async function customDebounceTime(ms: number) {
  log("start customDebounceTime with ms: " + ms)
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}
