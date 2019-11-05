import { RequestContentType, ResponseResultType, ResponseResultStatusEnum, ErrorResponseDataType } from "./types";
import { api } from "./api";
import { AxiosResponse, AxiosError } from "axios";
import { removeUserInfo } from "../storages/user";
import { useDispatch } from "react-redux";
import { toggleLoginStatusActionCreator } from "../actions/creators";


export const request = async (request: RequestContentType): Promise<ResponseResultType> => {
  return await api.request({
    url: encodeURI(request.url),
    ...(request.method !== undefined && { method: request.method }),
    ...(request.headers !== undefined && { headers: request.headers }),
    ...(request.data !== undefined && { data: request.data })
  }).then((response: AxiosResponse) => {
    /** success response **/
    return {
      data: response.data,
      status: ResponseResultStatusEnum.SUCCESS,
    } as ResponseResultType
  }).catch((error: AxiosError<ErrorResponseDataType>) => {
    /**
     * https://github.com/axios/axios/issues/960
     * axiox status code 4xx, 5xx code handling is in catch clause??
     **/
    /** 4xx, 5xx status code error handling **/
    if (error.response) {
      // if 401 (unauthorized error), remove userInfo from localStorage
      if (error.response.status === 401) {
        removeUserInfo()
        const dispatch = useDispatch()
        dispatch(toggleLoginStatusActionCreator(false))
      }

      return {
        status: ResponseResultStatusEnum.FAILURE,
        errorMsg: error.response.data.message
      }
    }
    /** connection (network) error handling **/
    return {
      status: ResponseResultStatusEnum.FAILURE,
      errorMsg: error.message
    }
  })
}
