import axios, { CancelTokenSource, CancelTokenStatic }  from 'axios'
import { RequestContentType, ResponseResultType, ResponseResultStatusEnum, ErrorResponseDataType } from "./types";
import { api } from "./api";
import { AxiosResponse, AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { toggleLoginStatusActionCreator } from "../actions/creators";
import { useAuthContext } from "../UI/Base/Context/AuthContext/AuthContext";


const cancelSource = api.CancelToken.source()

export const getCancelTokenSource: () => CancelTokenSource = () => {
  return api.CancelToken.source()
}

export const cancelRequest: () => void = () => {
  cancelSource.cancel('request is canceled')
}

export const request = async (request: RequestContentType): Promise<ResponseResultType> => {
  console.log('received request and start processing the request...')
  console.log(request)
  return await api.request({
    url: encodeURI(request.url),
    ...(request.method !== undefined && { method: request.method }),
    ...(request.headers !== undefined && { headers: request.headers }),
    ...(request.data !== undefined && { data: request.data }),
    ...(request.cancelToken && { cancelToken: request.cancelToken }) 
  }).then((response: AxiosResponse) => {
    /** success response **/
    console.log('api request succeeded.')
    return Promise.resolve({
      data: response.data,
      status: ResponseResultStatusEnum.SUCCESS,
    } as ResponseResultType)

  }).catch((error: AxiosError<ErrorResponseDataType>) => {
    console.log('api request failed. at request func')
    /** handle when cancel request **/
    if (api.isCancel(error)) {
      console.log('request is cancaled')
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
      console.log('api request failed because of 4xx, 5xx status code')
      // if 401 (unauthorized error), remove userInfo from localStorage
      if (error.response.status === 401) {
        // is it ok to use hook inside catch clause?? #DOUBT
        const { dispatch } = useAuthContext()
        dispatch({
          type: 'logout'
        })
      }

      return Promise.reject({
        status: ResponseResultStatusEnum.FAILURE,
        errorMsg: error.response.data.message
      })
    }
    /** connection (network) error handling **/
    console.log('api request failed because of network error')
    return Promise.reject({
      status: ResponseResultStatusEnum.FAILURE,
      errorMsg: error.message
    })
  })
}
