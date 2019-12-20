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
      // if 401 (unauthorized error), remove userInfo from localStorage
      if (error.response.status === 401) {
        debug('it\'s 401 error')
        /**
         * 401 status logic (refresh token, invalid role, no tokens)
         *
         * case 0: invalid role (e.g., member try to access/perform admin's resource/action) (type = INVALID_ROLE)
         *  - maybe remove this if clause since outter clause reject the promise with same object
         *  - procedure: (maybe need to create ui to avoid user from receive this message)
         *    1. set message and reject so wrapping function receive the rejected promise
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
         *    1.1.2 if failed, return Promise.reject(error) to merge this outer 'catch' clause and return this reject promise (type = ACCESS_TOKEN_AND_REFRESH_TOKEN_EXPIRED)
         *
         **/

        if (error.response.data.type === Error401ResponseDataTypeEnum.UNAUTHORIZED_ROLE) {
          debug('user try to access/perform unauthorized resource/action')
          // don't need to remove auth from localstorage
          // since access token and refresh token is valid
          return Promise.reject({
            type: Error401ResponseDataTypeEnum.UNAUTHORIZED_ROLE,
            status: ResponseResultStatusEnum.FAILURE,
            errorMsg: error.response.data.message
          })
        }
        if (error.response.data.type === Error401ResponseDataTypeEnum.ACCESS_TOKEN_EXPIRED) {
          debug('user\'s access token has expired')
          debug("start request for refresh access token")
          // 1.1. if so, send refresh access token request
          return api.request({
            method: RequestMethodEnum.POST,
            url: '/token/refresh',
          })
            .then((response: AxiosResponse) => {
              // 1.1.1 if success, re-request with the original request
              // when successfully refreshed access token (case2)
              // use recursive Promise; call wrapping function again since refresh access token and automatically call original request of user
              debug("successfully got new access token from refresh request")
              return request(requestContent)
            })
            .catch((error: AxiosError<ErrorResponseDataType>) => {
              // 1.1.2 if failed, return Promise.reject(error) to merge this outer 'catch' clause and return this reject promise (type = ACCESS_TOKEN_AND_REFRESH_TOKEN_EXPIRED)
              // remove auth object from localstorage since user does not have any valid access & refresh token
              debug("refresh access token failed. refresh token also has expired. route user to logn page")
              // make sure to remove auth from localstorage
              // TODO: better to move hook to ui concern (not here)
              //const { authDispatch } = useAuthContext()
              //authDispatch({
              //  type: 'logout'
              //})
              return Promise.reject({
                type: Error401ResponseDataTypeEnum.ACCESS_TOKEN_AND_REFRESH_TOKEN_EXPIRED,
                status: ResponseResultStatusEnum.FAILURE,
                errorMsg: error.response.data.message
              })
            })
        }
        if (error.response.data.type === Error401ResponseDataTypeEnum.NEITHER_ACCESS_TOKEN_AND_REFRESH_TOKEN_EXIST) {
          debug('user seems does not have any tokens')
          // make sure to remove auth from localstorage
          // TODO: better to move hook to ui concern (not here)
          //const { authDispatch } = useAuthContext()
          //authDispatch({
          //  type: 'logout'
          //})
          return Promise.reject({
            type: Error401ResponseDataTypeEnum.NEITHER_ACCESS_TOKEN_AND_REFRESH_TOKEN_EXIST,
            status: ResponseResultStatusEnum.FAILURE,
            errorMsg: error.response.data.message
          })
        }

        // need to route user to login page
        // does react does automatically (because of <AuthRoute/>?
        // or need to explicitly specify route here?
        // who knows?
      }

      /** 422 (Invalid jwt (access) token) **/
      if (error.response.status === 422) {
        debug('it\'s 422 error')
        // make sure to remove auth from localstorage
        // TODO: better to move hook to ui concern (not here)
        //const { authDispatch } = useAuthContext()
        //authDispatch({
        //  type: 'logout'
        //})
        return Promise.reject({
          status: ResponseResultStatusEnum.FAILURE,
          errorMsg: error.response.data.message
        })
      }

      // other error status like 400 (Bad Request), 404 (NOT FOUND) and so on
      //  - just reject promise and don't need to remove auth from local storage
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
