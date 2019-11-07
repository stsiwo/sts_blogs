import { AxiosResponse } from "axios";
import { getBlogTestData } from "../data/BlogFaker";
import { ErrorResponseDataType, BlogListResponseDataType } from "../../src/requests/types";

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
