import * as React from 'react'
import { ResponseResultStatusEnum, RequestMethodEnum, QueryStringType } from '../../../../requests/types';
import { PaginationStatusType } from '../Pagination/types';
import { CancelTokenSource } from 'axios';

export declare type FetchStatusType = {
  data?: any
  status: ResponseResultStatusEnum
  errorMsg?: string
}

export declare type FetchStatusPropType = {
  currentFetchStatus: FetchStatusType
  setFetchStatus: React.Dispatch<React.SetStateAction<FetchStatusType>>
}


export declare type UseFetchStatusInputType<T = any> = {
  path: string
  method?: RequestMethodEnum
  queryString?: QueryStringType
  callback?: (data: any) => void
}

export declare type UseFetchStatusOutputType = {
  currentFetchStatus: FetchStatusType
  setFetchStatus: React.Dispatch<React.SetStateAction<FetchStatusType>>
}

