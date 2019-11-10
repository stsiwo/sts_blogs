import { AxiosResponse } from "axios";
import { getBlogTestData } from "../data/BlogFaker";
import { ErrorResponseDataType, BlogListResponseDataType, UserResponseDataType } from "../../src/requests/types";
import { getUserTestData } from "../data/UserFaker";

export const noDateGET200Response: AxiosResponse<{}> = {
  data: '',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

export const userGET200Response: AxiosResponse<UserResponseDataType> = {
  data: {
    user: getUserTestData(1, true)[0]
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

export const blogGET200NonEmptyResponse: AxiosResponse<BlogListResponseDataType> = {
  data: {
    offset: 0,
    limit: 20,
    totalCount: 10000,
    blogs: getBlogTestData(40)
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

export const blogGET200EmptyResponse: AxiosResponse<BlogListResponseDataType> = {
  data: {
    offset: 0,
    limit: 20,
    totalCount: 10000,
    blogs: []
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

export const blogGET500Response: AxiosResponse<ErrorResponseDataType> = {
  data: {
    title: 'network or internal server error',
    message: 'some network/internal server error occurred',
  } as ErrorResponseDataType,
  status: 500,
  statusText: 'OK',
  headers: {},
  config: {},
}

export const internalServerError500Response: AxiosResponse<ErrorResponseDataType> = {
  data: {
    title: 'internal server error',
    message: 'a filed must be xxxxxx',
  } as ErrorResponseDataType,
  status: 500,
  statusText: 'Internal Server Error',
  headers: {},
  config: {},
}

export const badRequest400Response: AxiosResponse<ErrorResponseDataType> = {
  data: {
    title: 'bad request',
    message: 'a filed must be xxxxxx',
  } as ErrorResponseDataType,
  status: 400,
  statusText: 'Bad Request',
  headers: {},
  config: {},
}

export const unauthorized401Response: AxiosResponse<ErrorResponseDataType> = {
  data: {
    title: 'unauthorized 401 response title',
    message: 'unauthorized 401 response message',
  } as ErrorResponseDataType,
  status: 401,
  statusText: 'Unauthorized',
  headers: {},
  config: {},
}

export const notFound404Response: AxiosResponse<ErrorResponseDataType> = {
  data: {
    title: 'not found 404 response title',
    message: 'not found 404 response message',
  } as ErrorResponseDataType,
  status: 404,
  statusText: 'Not Found',
  headers: {},
  config: {},
}

declare global {
  interface Promise<T> {
    delay: (t: number) => Promise<any>
  }
}

/** promise delay **/
export function delay(t: number, v: any) {
   return new Promise(function(resolve) {
       setTimeout(resolve.bind(null, v), t)
   });
}
