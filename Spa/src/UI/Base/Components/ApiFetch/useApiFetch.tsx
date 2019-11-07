import * as React from 'react';
import { request, getCancelSource } from '../../../../requests/request';
import { ResponseResultStatusEnum, ResponseResultType, QueryStringType } from "../../../../requests/types";
import { FetchStatusType, UseFetchStatusInputType, UseFetchStatusOutputType } from "./types";
import { buildQueryString } from '../../../../utils'
import { AxiosError, CancelTokenSource } from 'axios';
import { api } from '../../../../requests/api';


export const useApiFetch = (input: UseFetchStatusInputType): UseFetchStatusOutputType => {

  const [currentFetchStatus, setFetchStatus] = React.useState<FetchStatusType>({
    status: ResponseResultStatusEnum.INITIAL
  })
  const [currentRefreshStatus, setRefreshStatus] = React.useState<number>(0)
  const cancelSource = input.enableCancel ? getCancelSource() : null
  const [currentCancelSource, setCancelSource] = React.useState<CancelTokenSource>(cancelSource)

  const encodedQueryString = buildQueryString(input.queryString)

  React.useEffect(() => {

    if (input.enableCancel) setCancelSource(getCancelSource())

    async function fetchData() {
      setFetchStatus({
        status: ResponseResultStatusEnum.FETCHING,
      })
      console.log('inside useEffect and before request function')
      console.log(input)

      console.log('currentCAncelSource')
      console.log(currentCancelSource)

      await request({
        url: input.path + encodedQueryString,
        ...(input.method && { method: input.method }),
        ...(currentCancelSource && { cancelToken: currentCancelSource.token })
      })
        .then((responseResult: ResponseResultType) => {
          /** this include 'catch' clause of 'requests' method **/
          setFetchStatus({
            status: responseResult.status,
            data: responseResult.data,
            errorMsg: responseResult.errorMsg
          })
          /**
           * any callback when response is secceeded 
           * e.g., assign domain data
           * e.g., assign new total count of pagination
           **/
          input.callback(responseResult.data)
        })
        .catch((error: AxiosError) => {
          /** this is called when above 'then' caluse failed **/
          /** esp, 'input.callback' internal error **/
          setFetchStatus({
            status: ResponseResultStatusEnum.FAILURE,
            errorMsg: error.message
          })
        })
    }
    fetchData()

    return () => {
    }
  }, [
      currentRefreshStatus,
      encodedQueryString
    ])

  console.log('before return')
  console.log(currentCancelSource)

  return {
    currentFetchStatus: currentFetchStatus,
    currentRefreshStatus: currentRefreshStatus,
    setFetchStatus: setFetchStatus,
    setRefreshStatus: setRefreshStatus,
    ...(currentCancelSource && { cancelSource: currentCancelSource })
  }
}

