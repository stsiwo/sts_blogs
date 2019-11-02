import { RequestContentType, ResponseResultType, ResponseResultStatusEnum, ErrorResponseDataType } from "./types";
import { api } from "./api";
import { AxiosResponse, AxiosError } from "axios";


export const request = async (request: RequestContentType): Promise<ResponseResultType> => {
  return await api.request({
    url: encodeURI(request.url),
    ...(request.method !== undefined && { method: request.method })
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
