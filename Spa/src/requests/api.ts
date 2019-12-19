import axios, { AxiosInstance, CancelTokenStatic, AxiosError, AxiosResponse } from 'axios'
import { apiConfig } from 'configs/apiConfig';
import { ErrorResponseDataType, RequestMethodEnum, Error401ResponseDataTypeEnum } from './types';

declare type AxiosInstanceWithCancelToken = AxiosInstance & {
  CancelToken?: CancelTokenStatic
  isCancel?: (value: any) => boolean
}


const instance: AxiosInstanceWithCancelToken = axios.create(apiConfig)
instance.CancelToken = axios.CancelToken
instance.isCancel = axios.isCancel

// for the sake of 'withCredentials' (github issues saied that instance axios with 'withCredentials' does not work)
// but this might not be true. so make sure if it works with instance 
// for now, change instance to global axios
axios.defaults.baseURL = apiConfig.baseURL
axios.defaults.timeout = apiConfig.timeout
axios.defaults.transformResponse = apiConfig.transformResponse
axios.defaults.withCredentials = apiConfig.withCredentials

// interceptor for 401 error for each use case
function error401Interceptor(error: AxiosError<ErrorResponseDataType>) {

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

  // 1. check error.response.data.type is ACCESS_TOKEN_EXPIRED
  if (error.config && error.response && error.response.status === 401 && error.response.data.type === Error401ResponseDataTypeEnum.ACCESS_TOKEN_EXPIRED) {
    console.log('start handling error 401 in interceptor')
    // 1.1. if so, send refresh access token request
    axios.request({
      method: RequestMethodEnum.POST,
      url: '/token/refresh',
    })
      // 1.1.1 if success, re-request with the original request
      .then((response: AxiosResponse) => {
        // when successfully refreshed access token (case2)
        // TODO: how to implement? 
      })
      // 1.1.2 if failed, return Promise.reject(error) to call catch clause in request.ts
      .catch((error: AxiosError<ErrorResponseDataType>) => {
        return Promise.reject(error)
      })

    // 2. return Promise.reject(error) to call catch clause in request.ts
    return Promise.reject(error)
  }

}

axios.interceptors.response.use(null, error401Interceptor)

console.log('axios defaults')
console.log(axios.defaults)

export const api = axios

// base static cancel token class
// you can get token factory object by calling source() 
// source factory should be new object for each request. sharing the same source factory causes cancel all request shared by the source factory and prevent restart the reqeust again
// then you can generate token by source.token
//  - the token must be provided to request as argument of 'cancelToken' when request
// then you can cancel the request by source.cancel('msg')
