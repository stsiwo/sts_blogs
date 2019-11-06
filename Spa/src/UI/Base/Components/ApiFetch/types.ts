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

export declare type RefreshBtnPropType = {
  currentFetchStatus: FetchStatusType
  setFetchStatus: React.Dispatch<React.SetStateAction<FetchStatusType>>
  currentRefreshStatus: number
  setRefreshStatus: React.Dispatch<React.SetStateAction<number>>
  cancelSource?: CancelTokenSource
}

export declare type UseFetchStatusInputType<T = any> = {
  path: string
  method?: RequestMethodEnum
  queryString?: QueryStringType
  enableCancel?: boolean
  callback?: (data: any) => void
}

export declare type UseFetchStatusOutputType = {
  currentFetchStatus: FetchStatusType
  currentRefreshStatus: number
  setFetchStatus: React.Dispatch<React.SetStateAction<FetchStatusType>>
  setRefreshStatus: React.Dispatch<React.SetStateAction<number>>
  cancelSource?: CancelTokenSource
}

