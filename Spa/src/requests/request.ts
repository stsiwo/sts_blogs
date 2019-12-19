import axios, { CancelTokenSource, CancelTokenStatic } from 'axios'
import { RequestContentType, ResponseResultType, ResponseResultStatusEnum, ErrorResponseDataType, Error401ResponseDataTypeEnum, RequestMethodEnum } from "./types";
import { api } from "./api";
import { AxiosResponse, AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { toggleLoginStatusActionCreator } from "actions/creators";
import { useAuthContext } from "Contexts/AuthContext/AuthContext";
var debug = require('debug')('ui:request')


const cancelSource = api.CancelToken.source()

export const getCancelTokenSource: () => CancelTokenSource = () => {
  return api.CancelToken.source()
}

export const cancelRequest: () => void = () => {
  cancelSource.cancel('request is canceled')
}

export const request = async (requestContent: RequestContentType): Promise<ResponseResultType> => {
  debug('received request and start processing the request...')
  debug(requestContent)
  return await api.request({
    url: encodeURI(requestContent.url),
    ...(requestContent.method !== undefined && { method: requestContent.method }),
    ...(requestContent.headers !== undefined && { headers: requestContent.headers }),
    ...(requestContent.data !== undefined && { data: requestContent.data }),
    ...(requestContent.cancelToken && { cancelToken: requestContent.cancelToken })
  }).then((response: AxiosResponse) => {
    /** success response **/
    debug('api request succeeded.')
    return Promise.resolve({
      data: response.data,
      status: ResponseResultStatusEnum.SUCCESS,
    } as ResponseResultType)

  }).catch((error: AxiosError<ErrorResponseDataType>) => {
    debug('api request failed. at request func')
    console.log('api request failed. at request func')
    /** handle when cancel request **/
    if (api.isCancel(error)) {
      debug('request is cancaled')
      debug(error)
      return Promise.reject({
        status: ResponseResultStatusEnum.CANCEL,
        errorMsg: error.message
      })
    }
    /**
     * https://github.com/axios/axios/issues/960
     * axiox status code 4xx, 5xx code handling is in catch clause??
     **/
    /** 4xx, 5xx status code error handling **/
    if (error.response) {
      debug('api request failed because of 4xx, 5xx status code')
      console.log('api request failed because of 4xx, 5xx status code')
      // if 401 (unauthorized error), remove userInfo from localStorage
      if (error.response.status === 401) {
        debug('it\'s 401 error')
        console.log('it\'s 401 error')
        /**
         * refresh token logic
         *
         * case 1: acces token cookie is expired but refresh token (type = ACCESS_TOKEN_EXPIRED)
         *  - procedure: 
         *    1. receive 401 access token is expired
         *    2. send request for refresh access token
         *      2.1. success: get new access token
         *        2.1.1. re-request the original request
         *      2.2. fail; refresh token is also expired (type = ACCESS_TOKEN_AND_REFRESH_TOKEN_EXPIRED)
         *        2.2.1. route user to login page --> the same, so delegate to request.ts
         * case 2: client does not hvae any access token and refresh token (type = NEITHER_ACCESS_TOKEN_AND_REFRESH_TOKEN_EXIST)
         *  - procedure: 
         *    1. receive 401 
         *    2. route user to login page  --> the same, so delegate to request.ts
         *
         * implementation: 
         *  1. check error.response.data.type is ACCESS_TOKEN_EXPIRED
         *   1.1. if so, send refresh access token request
         *    1.1.1 if success, re-request with the original request 
         *    1.1.2 if failed, return Promise.reject(error) to call catch clause in request.ts  
         *  2. return Promise.reject(error) to call catch clause in request.ts 
         *
         **/
        if (error.response.data.type === Error401ResponseDataTypeEnum.ACCESS_TOKEN_EXPIRED) {
          console.log('start handling error 401 in interceptor')
          // 1.1. if so, send refresh access token request
          axios.request({
            method: RequestMethodEnum.POST,
            url: '/token/refresh',
          })
            // 1.1.1 if success, re-request with the original request
            .then((response: AxiosResponse) => {
              // when successfully refreshed access token (case2)
              // TODO: #DOUBT below
              request(requestContent)
            })
            // 1.1.2 if failed, return Promise.reject(error) to call catch clause in request.ts
            .catch((error: AxiosError<ErrorResponseDataType>) => {
              return Promise.reject(error)
            })

          // 2. return Promise.reject(error) to call catch clause in request.ts
          return Promise.reject(error)
        }

        // need to route user to login page
        // does react does automatically (because of <AuthRoute/>?
        // or need to explicitly specify route here?
        // who knows
        const { authDispatch } = useAuthContext()
        authDispatch({
          type: 'logout'
        })
      }

      /** 422 (Invalid jwt (access) token) **/
      if (error.response.status === 422) {
        debug('it\'s 422 error')
        // TODO: implement it
      }

      return Promise.reject({
        status: ResponseResultStatusEnum.FAILURE,
        errorMsg: error.response.data.message
      })
    }
    /** connection (network) error handling **/
    debug('api request failed because of network error')
    return Promise.reject({
      status: ResponseResultStatusEnum.FAILURE,
      errorMsg: error.message
    })
  })
}
