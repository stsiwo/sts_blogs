import { AxiosResponse, AxiosError } from "axios";
import { getBlogTestData } from "../data/BlogFaker";
import { ErrorResponseDataType, BlogListResponseDataType, UserResponseDataType, BlogResponseDataType, Error401ResponseDataTypeEnum } from "requests/types";
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

export const singleBlogGET200NonEmptyResponse: AxiosResponse<BlogResponseDataType> = {
  data: {
    blog: getBlogTestData(1)[0]
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

export const networkError: AxiosError = {
  config: null,
  name: 'Error',
  isAxiosError: true,
  message: 'network error'
}

export const internalServerError500Response: AxiosError<ErrorResponseDataType> = {
  name: 'error message',
  message: 'internal server error message',
  config: {},
  response: {
    data: {
      title: 'internal server error',
      message: 'internal server error message',
    } as ErrorResponseDataType,
    status: 500,
    statusText: 'Internal Server Error',
    headers: {},
    config: {},
  } as AxiosResponse,
  isAxiosError: false
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

export const invalidToken400Response: AxiosError<ErrorResponseDataType> = {
  name: 'error message',
  message: 'token is invalid. it seems wrong type. please start over again.',
  config: {},
  response: {
    data: {
      title: 'bad request',
      message: 'token is invalid. it seems wrong type. please start over again.',
    } as ErrorResponseDataType,
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config: {},
  } as AxiosResponse,
  isAxiosError: false
}

export const expiredToken400Response: AxiosError<ErrorResponseDataType> = {
  name: 'error message',
  message: 'token is invalid. it seems wrong type. please start over again.',
  config: {},
  response: {
    data: {
      title: 'bad request',
      message: 'reset password token is exipred. please start over again.',
    } as ErrorResponseDataType,
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config: {},
  } as AxiosResponse,
  isAxiosError: false
}

export const unauthorized401Response: AxiosResponse<ErrorResponseDataType> = {
  data: {
    type: Error401ResponseDataTypeEnum.ACCESS_TOKEN_EXPIRED,
    title: 'unauthorized 401 response title',
    message: 'unauthorized 401 response message',
  } as ErrorResponseDataType,
  status: 401,
  statusText: 'Unauthorized',
  headers: {},
  config: {},
}

export const unauthorized401WithAccessTokenExpiredResponse: AxiosError<ErrorResponseDataType> = {
  name: 'unauthorized error',
  message: 'unauthorized error',
  config: {},
  response: {
    data: {
      type: Error401ResponseDataTypeEnum.ACCESS_TOKEN_EXPIRED,
      title: 'unauthorized 401 response title',
      message: 'The access token has expired',
    } as ErrorResponseDataType,
    status: 401,
    statusText: 'Unauthorized',
    headers: {},
    config: {},
  } as AxiosResponse,
  isAxiosError: false
}

export const unauthorized401WithAtAndRtExpiredResponse: AxiosError<ErrorResponseDataType> = {
  name: 'unauthorized error',
  message: 'unauthorized error',
  config: {},
  response: {
    data: {
      type: Error401ResponseDataTypeEnum.ACCESS_TOKEN_AND_REFRESH_TOKEN_EXPIRED,
      title: 'unauthorized 401 response title',
      message: 'both refresh token and access token have expired',
    } as ErrorResponseDataType,
    status: 401,
    statusText: 'Unauthorized',
    headers: {},
    config: {},
  } as AxiosResponse,
  isAxiosError: false
}

export const unauthorized401WithNoAtNorRtResponse: AxiosError<ErrorResponseDataType> = {
  name: 'unauthorized error',
  message: 'unauthorized error',
  config: {},
  response: {
    data: {
      type: Error401ResponseDataTypeEnum.NEITHER_ACCESS_TOKEN_AND_REFRESH_TOKEN_EXIST,
      title: 'unauthorized 401 response title',
      message: 'no access and refresh token are provided',
    } as ErrorResponseDataType,
    status: 401,
    statusText: 'Unauthorized',
    headers: {},
    config: {},
  } as AxiosResponse,
  isAxiosError: false
}

export const unauthorized401WithUnauthorizedRoleResponse: AxiosError<ErrorResponseDataType> = {
  name: 'unauthorized error',
  message: 'unauthorized error',
  config: {},
  response: {
    data: {
      type: Error401ResponseDataTypeEnum.UNAUTHORIZED_ROLE,
      title: 'unauthorized 401 response title',
      message: 'provided token is not allowed to access/perform requested resource/action',
    } as ErrorResponseDataType,
    status: 401,
    statusText: 'Unauthorized',
    headers: {},
    config: {},
  } as AxiosResponse,
  isAxiosError: false
}

export const invalidToken422Response: AxiosError<ErrorResponseDataType> = {
  name: 'invalid token error',
  message: 'invalid token error',
  config: {},
  response: {
    data: {
      title: 'invalid token 422 response title',
      message: 'provided token is invalid',
    } as ErrorResponseDataType,
    status: 422,
    statusText: 'Unauthorized',
    headers: {},
    config: {},
  } as AxiosResponse,
  isAxiosError: false
}

export const notFound404ResponseV2: AxiosError<ErrorResponseDataType> = {
  name: 'not found error',
  message: 'provided email is not found',
  config: {},
  response: {
    data: {
      title: 'not found 404 response title',
      message: 'provided email is not found',
    } as ErrorResponseDataType,
    status: 404,
    statusText: 'Not Found',
    headers: {},
    config: {},
  } as AxiosResponse,
  isAxiosError: false
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
