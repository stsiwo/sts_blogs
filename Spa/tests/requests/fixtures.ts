import { AxiosResponse } from "axios";
import { getBlogTestData } from "../data/BlogFaker";
import { ErrorResponseDataType } from "../../src/requests/types";

export const blogGET200NonEmptyResponse: AxiosResponse = {
  data: getBlogTestData(40),
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

export const blogGET200EmptyResponse: AxiosResponse = {
  data: [],
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

export const blogGET500Response: AxiosResponse = {
  data: {
    title: 'network or internal server error',
    message: 'some network/internal server error occurred',
  } as ErrorResponseDataType,
  status: 500,
  statusText: 'OK',
  headers: {},
  config: {},
}
