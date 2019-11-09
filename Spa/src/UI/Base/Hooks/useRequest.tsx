import * as React from 'react'
import { UseRequestStatusInputType, UseRequestStatusOutputType, RequestStatusType } from "./types";
import { ResponseResultStatusEnum, ResponseResultType } from '../../../requests/types';
import { buildQueryString } from '../../../utils';
import { request } from '../../../requests/request';
import { AxiosError } from 'axios';

export const useRequest = (input: UseRequestStatusInputType): UseRequestStatusOutputType => {

  const [currentRequestStatus, setRequestStatus] = React.useState<RequestStatusType>({
    status: ResponseResultStatusEnum.INITIAL
  })

  const encodedQueryString = buildQueryString(input.queryString)

  async function fetchData() {
    setRequestStatus({
      status: ResponseResultStatusEnum.FETCHING,
    })
    await request({
      url: input.path + encodedQueryString,
      ...(input.method && { method: input.method }),
    })
      .then((responseResult: ResponseResultType) => {
        /** this include 'catch' clause of 'requests' method **/
        setRequestStatus({
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
        setRequestStatus({
          status: ResponseResultStatusEnum.FAILURE,
          errorMsg: error.message
        })
      })
  }

  return {
    currentRequestStatus: currentRequestStatus,
    setRequestStatus: setRequestStatus,
    fetchData: fetchData
  }
}



