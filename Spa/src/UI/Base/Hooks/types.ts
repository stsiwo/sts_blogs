import * as React from 'react'
import { CancelTokenSource } from 'axios';
import { ResponseResultStatusEnum, RequestMethodEnum, QueryStringType } from '../../../requests/types';

export declare type RequestStatusType = {
  data?: any
  status: ResponseResultStatusEnum
  errorMsg?: string
}

export declare type RequestStatusPropType = {
  currentRequestStatus: RequestStatusType
  setRequestStatus: React.Dispatch<React.SetStateAction<RequestStatusType>>
}

export declare type FetchDataArgType = {
  path: string
  method?: RequestMethodEnum
  headers?: any
  data?: any
  queryString?: QueryStringType
  callback?: (data: any) => void
}

export declare type UseRequestStatusInputType<T = any> = {
}

export declare type UseRequestStatusOutputType = {
  currentRequestStatus: RequestStatusType
  setRequestStatus: React.Dispatch<React.SetStateAction<RequestStatusType>>
  fetchData: (args: FetchDataArgType) => void
}


