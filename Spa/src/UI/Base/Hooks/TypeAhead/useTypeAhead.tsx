import { UseTypeAheadInputType, UseTypeAheadOutputType } from "./types";
import * as React from "react";
import { Subject, from } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import { logger } from 'configs/logger';
import { useRequest } from "Hooks/Request/useRequest";
import { RequestMethodEnum, ResponseResultType } from "requests/types";
const log = logger("useTypeAhead");

export const useTypeAhead = (input: UseTypeAheadInputType): UseTypeAheadOutputType => {

  /**
   * need to use 'useState'. 
   * this is because to prevent react from recreate new Subject object every time this component re-rendered.
   *  - that's why 'debounceTime' does not work since every time create new subject object there is not continuous input at all.
   **/
  const [curSubject$, setSubject$] = React.useState<Subject<string>>(new Subject<string>())
  const { currentRequestStatus, setRequestStatus, sendRequest } = useRequest({})


  React.useEffect(() => {
    log("start subscribe type ahead feature")
    const subscription = curSubject$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((value: string) => {
          log("start type ahead request with value: " + value)
          return from(sendRequest({
            path: input.url, 
            ...(input.method && { method: input.method }),
          }))
        })
      )
      .subscribe({
        next: (result: ResponseResultType) => log(result)
      });

    return () => {
      log("unsubscribe type ahead feature")
      return subscription.unsubscribe();
    }
    /**
     * execute only when initial mount and unsubscribe at unmount
     * don't need to subscribe every time this component is re-rendered (update)
     **/
  }, [])

  return {
    subject$: curSubject$,
    currentRequestStatus: currentRequestStatus
  }
}

