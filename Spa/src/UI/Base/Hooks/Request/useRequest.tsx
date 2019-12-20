import * as React from 'react'
import { UseRequestStatusInputType, UseRequestStatusOutputType, RequestStatusType, FetchDataArgType } from "./types";
import { AxiosError, CancelTokenSource } from 'axios';
import { ResponseResultStatusEnum, ResponseResultType } from 'requests/types';
import { request, getCancelTokenSource } from 'requests/request';
import { buildQueryString } from '../../../../utils';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
var debug = require('debug')('ui:FetchStatus')


export const useRequest = (input: UseRequestStatusInputType): UseRequestStatusOutputType => {

  const [currentRequestStatus, setRequestStatus] = React.useState<RequestStatusType>({
    status: ResponseResultStatusEnum.INITIAL
  })

  const { authDispatch } = useAuthContext()

  const [currentCancelSource, setCancelSource] = React.useState<CancelTokenSource>(null)

  async function sendRequest(args: FetchDataArgType) {
    debug('start handling fetch data function')
    debug(args)
    setRequestStatus({
      status: ResponseResultStatusEnum.FETCHING,
    })
    const cancelTokenSource = getCancelTokenSource()
    setCancelSource(cancelTokenSource)

    return await request({
      url: args.path + buildQueryString(args.queryString),
      ...(args.method && { method: args.method }),
      ...(args.headers && { headers: args.headers }),
      ...(args.data && { data: args.data }),
      cancelToken: cancelTokenSource.token
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
      .catch((result: ResponseResultType) => {
        debug('fetch data then clause failed at sendRequest')
        /** this is called when above 'then' caluse failed **/
        /** or 'request' function reject promise **/

        /** logout if error type is 401 (ACCESS_AND_REFRESH_TOKEN_EXIPRED and INVALID_TOKEN) **/
        if (result.needLogout) {
          authDispatch({
            type: 'logout'
          })
        }

        setRequestStatus({
          status: ResponseResultStatusEnum.FAILURE,
          errorMsg: result.errorMsg
        })
        return Promise.resolve(result)
      })
  }

  return {
    currentRequestStatus: currentRequestStatus,
    setRequestStatus: setRequestStatus,
    sendRequest: sendRequest,
    currentCancelSource: currentCancelSource
  }
}



