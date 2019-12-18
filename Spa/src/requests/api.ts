import axios, { AxiosInstance, CancelTokenStatic } from 'axios'
import { apiConfig } from 'configs/apiConfig';

declare type AxiosInstanceWithCancelToken = AxiosInstance & {
  CancelToken?: CancelTokenStatic
  isCancel?: (value: any) => boolean
}


const instance: AxiosInstanceWithCancelToken = axios.create(apiConfig)
instance.CancelToken = axios.CancelToken
instance.isCancel = axios.isCancel

axios.defaults.baseURL = apiConfig.baseURL
axios.defaults.timeout = apiConfig.timeout
axios.defaults.transformResponse = apiConfig.transformResponse
axios.defaults.withCredentials = apiConfig.withCredentials

console.log('axios defaults')
console.log(axios.defaults)

export const api = axios

// base static cancel token class
// you can get token factory object by calling source() 
// source factory should be new object for each request. sharing the same source factory causes cancel all request shared by the source factory and prevent restart the reqeust again
// then you can generate token by source.token
//  - the token must be provided to request as argument of 'cancelToken' when request
// then you can cancel the request by source.cancel('msg')
