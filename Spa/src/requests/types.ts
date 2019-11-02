export enum ResponseResultStatusEnum {
  INITIAL,
  FETCHING,
  SUCCESS,
  FAILURE,
}

export enum RequestMethodEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export declare type ResponseResultType = {
  data?: any
  status: ResponseResultStatusEnum
  errorMsg?: string 
}

export declare type RequestContentType = {
  url: string,
  method?: RequestMethodEnum
}

export declare type ErrorResponseDataType = {
  title: string,
  message: string, 
  status: number
}

export declare type QueryStringType = {
  [key:string]: any
  //[key:string]?: string
  // is not valid
}
