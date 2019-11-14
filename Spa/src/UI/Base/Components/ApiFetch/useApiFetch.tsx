import * as React from 'react';
import { request } from 'requests/request';
import { ResponseResultStatusEnum, ResponseResultType, QueryStringType } from "requests/types";
import { FetchStatusType, UseFetchStatusInputType, UseFetchStatusOutputType } from "./types";
import { buildQueryString } from '../../../../utils'
import { AxiosError, CancelTokenSource } from 'axios';
import { api } from 'requests/api';


export const useApiFetch = (input: UseFetchStatusInputType): UseFetchStatusOutputType => {

  const [currentFetchStatus, setFetchStatus] = React.useState<FetchStatusType>({
    status: ResponseResultStatusEnum.INITIAL
  })

  const encodedQueryString = buildQueryString(input.queryString)

  React.useEffect(() => {

    async function fetchData() {
      setFetchStatus({
        status: ResponseResultStatusEnum.FETCHING,
      })
      await request({
        url: input.path + encodedQueryString,
        ...(input.method && { method: input.method }),
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
      encodedQueryString
    ])

  return {
    currentFetchStatus: currentFetchStatus,
    setFetchStatus: setFetchStatus,
  }
}

