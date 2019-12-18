import { BlogType } from "domain/blog/BlogType";
import { CancelToken } from "axios";
import { UserType } from "domain/user/UserType";

export enum ResponseResultStatusEnum {
  INITIAL = 0,
  FETCHING = 1,
  SUCCESS = 2,
  FAILURE = 3,
  CANCEL = 4,
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

/** content (data) type of response **/
export declare type ResponseBaseDataType = {
  offset: number
  limit: number
  totalCount: number
}

export declare type BlogListResponseDataType = ResponseBaseDataType & {
  blogs: BlogType[]
}

export declare type BlogResponseDataType = {
  blog: BlogType
}

export declare type UserResponseDataType = {
  user: UserType
}

export declare type RequestContentType = {
  url: string
  method?: RequestMethodEnum
  headers?: any
  data?: any
  cancelToken?: CancelToken
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
