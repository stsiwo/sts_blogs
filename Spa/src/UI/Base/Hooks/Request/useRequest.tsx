import * as React from 'react'
import { UseRequestStatusInputType, UseRequestStatusOutputType, RequestStatusType, FetchDataArgType } from "./types";
import { AxiosError } from 'axios';
import { ResponseResultStatusEnum, ResponseResultType } from '../../../../requests/types';
import { request } from '../../../../requests/request';
import { buildQueryString } from '../../../../utils';


export const useRequest = (input: UseRequestStatusInputType): UseRequestStatusOutputType => {

  const [currentRequestStatus, setRequestStatus] = React.useState<RequestStatusType>({
    status: ResponseResultStatusEnum.INITIAL
  })

  async function sendRequest(args: FetchDataArgType) {
    console.log('start handling fetch data function')
    console.log(args)
    setRequestStatus({
      status: ResponseResultStatusEnum.FETCHING,
    })
    return await request({
      url: args.path + buildQueryString(args.queryString),
      ...(args.method && { method: args.method }),
      ...(args.headers && { headers: args.headers }),
      ...(args.data && { data: args.data })
    })
      .then((responseResult: ResponseResultType) => {
        console.log('fetch data function receive response successfully')
        console.log(responseResult)
        /** this include 'catch' clause of 'requests' method **/
        setRequestStatus({
          status: responseResult.status,
          data: responseResult.data,
          errorMsg: responseResult.errorMsg
        })
        /**
         * return promise with responseResult
         *  - avoid using 'callback'
         **/
        return Promise.resolve(responseResult.data)
      })
      .catch((error: AxiosError) => {
        console.log('fetch data then clause failed')
        /** this is called when above 'then' caluse failed **/
        /** esp, 'args.callback' internal error **/
        setRequestStatus({
          status: ResponseResultStatusEnum.FAILURE,
          errorMsg: error.message
        })
        return Promise.reject()
      })
  }

  return {
    currentRequestStatus: currentRequestStatus,
    setRequestStatus: setRequestStatus,
    sendRequest: sendRequest
  }
}



