import axios, { CancelTokenSource, CancelTokenStatic } from 'axios'
import { RequestContentType, ResponseResultType, ResponseResultStatusEnum, ErrorResponseDataType, Error401ResponseDataTypeEnum, RequestMethodEnum } from "./types";
import { api } from "./api";
import { AxiosResponse, AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { toggleLoginStatusActionCreator } from "actions/creators";
import { useAuthContext } from "Contexts/AuthContext/AuthContext";
import { logger } from 'configs/logger';
const log = logger("request");


const cancelSource = api.CancelToken.source()

export const getCancelTokenSource: () => CancelTokenSource = () => {
  return api.CancelToken.source()
}

export const cancelRequest: () => void = () => {
  cancelSource.cancel('request is canceled')
}

export const request = async (requestContent: RequestContentType): Promise<ResponseResultType> => {
  log('received request and start processing the request...')
  log(requestContent)
  return await api.request({
    url: encodeURI(requestContent.url),
    ...(requestContent.method !== undefined && { method: requestContent.method }),
    ...(requestContent.headers !== undefined && { headers: requestContent.headers }),
    ...(requestContent.data !== undefined && { data: requestContent.data }),
    ...(requestContent.cancelToken && { cancelToken: requestContent.cancelToken })
  }).then((response: AxiosResponse) => {
    /** success response **/
    log('api request succeeded.')
    return Promise.resolve({
      data: response.data,
      status: ResponseResultStatusEnum.SUCCESS,
    } as ResponseResultType)

  }).catch((error: AxiosError<ErrorResponseDataType>) => {
    log('api request failed. at request func')
    log(error)
    /** handle when cancel request **/
    if (api.isCancel(error)) {
      log('request is cancaled')
      log(error)
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
      log('api request failed because of 4xx, 5xx status code')
      // if 401 (unauthorized error), remove userInfo from localStorage
      if (error.response.status === 401) {
        log('it\'s 401 error')

        if (error.response.data.type === Error401ResponseDataTypeEnum.UNAUTHORIZED_ROLE) {
          log('user try to access/perform unauthorized resource/action')
          // don't need to remove auth from localstorage
          // since access token and refresh token is valid
          return Promise.reject({
            type: Error401ResponseDataTypeEnum.UNAUTHORIZED_ROLE,
            status: ResponseResultStatusEnum.FAILURE,
            errorMsg: error.response.data.message
          })
        }
        if (error.response.data.type === Error401ResponseDataTypeEnum.ACCESS_TOKEN_EXPIRED) {
          log('user\'s access token has expired')
          log("start request for refresh access token")
          // 1.1. if so, send refresh access token request
          return api.request({
            method: RequestMethodEnum.POST,
            url: '/token/refresh',
          })
            .then((response: AxiosResponse) => {
              // 1.1.1 if success, re-request with the original request
              // when successfully refreshed access token (case2)
              // use recursive Promise; call wrapping function again since refresh access token and automatically call original request of user
              log("successfully got new access token from refresh request")
              return request(requestContent)
            })
            .catch((error: AxiosError<ErrorResponseDataType>) => {
              // 1.1.2 if failed, return Promise.reject(error) to merge this outer 'catch' clause and return this reject promise (type = ACCESS_TOKEN_AND_REFRESH_TOKEN_EXPIRED)
              // remove auth object from localstorage since user does not have any valid access & refresh token
              log("refresh access token failed. refresh token also has expired. route user to logn page")

              // TODO: do i need to implement this?? 
              //  - reqeust for remove the expired tokens
              
              return Promise.reject({
                needLogout: true,
                type: Error401ResponseDataTypeEnum.ACCESS_TOKEN_AND_REFRESH_TOKEN_EXPIRED,
                status: ResponseResultStatusEnum.FAILURE,
                errorMsg: error.response.data.message
              })
            })
        }
        if (error.response.data.type === Error401ResponseDataTypeEnum.NEITHER_ACCESS_TOKEN_AND_REFRESH_TOKEN_EXIST) {
          log('user seems does not have any tokens')
          return Promise.reject({
            needLogout: true,
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
        /**
         * meaning of invalid??
         *  - means member user try to access different member's resource??
         *  - i'm not sure
         *  TODO: make sure.
         **/
        log('it\'s 422 error')
        return Promise.reject({
          status: ResponseResultStatusEnum.FAILURE,
          errorMsg: error.response.data.message
        })
      }

      // other error status like 400 (Bad Request), 404 (NOT FOUND) and so on
      //  - just reject promise and don't need to remove auth from local storage
      log('other error status like 400 (Bad Request), 404 (NOT FOUND) and so on')
      return Promise.reject({
        status: ResponseResultStatusEnum.FAILURE,
        errorMsg: error.response.data.message
      })
    }
    /** connection (network) error handling **/
    log('api request failed because of network error')
    return Promise.reject({
      status: ResponseResultStatusEnum.FAILURE,
      errorMsg: error.message
    })
  })
}
