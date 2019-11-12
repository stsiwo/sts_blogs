import * as React from 'react'
import { UseRequestStatusInputType, UseRequestStatusOutputType, RequestStatusType, FetchDataArgType } from "./types";
import { AxiosError } from 'axios';
import { ResponseResultStatusEnum, ResponseResultType } from '../../../../requests/types';
import { request } from '../../../../requests/request';
import { buildQueryString } from '../../../../utils';
var debug = require('debug')('ui:FetchStatus')


export const useRequest = (input: UseRequestStatusInputType): UseRequestStatusOutputType => {

  const [currentRequestStatus, setRequestStatus] = React.useState<RequestStatusType>({
    status: ResponseResultStatusEnum.INITIAL
  })

  async function sendRequest(args: FetchDataArgType) {
    debug('start handling fetch data function')
    debug(args)
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
        debug('fetch data function receive response successfully')
        debug(responseResult)
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
        debug('fetch data then clause failedat sendRequest')
        /** this is called when above 'then' caluse failed **/
        /** esp, 'args.callback' internal error **/
        setRequestStatus({
          status: ResponseResultStatusEnum.FAILURE,
          errorMsg: error.message
        })
        return Promise.resolve()
      })
  }

  return {
    currentRequestStatus: currentRequestStatus,
    setRequestStatus: setRequestStatus,
    sendRequest: sendRequest
  }
}



