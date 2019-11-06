import axios, { AxiosInstance, CancelTokenStatic } from 'axios'
import { apiConfig } from '../configs/apiConfig';

export const api: AxiosInstance = axios.create(apiConfig)

// base static cancel token class
// you can get token factory object by calling source()
// then you can generate token by source.token
//  - the token must be provided to request as argument of 'cancelToken' when request
// then you can cancel the request by source.cancel('msg')
export const CancelTokenStaticClass: CancelTokenStatic = axios.CancelToken
