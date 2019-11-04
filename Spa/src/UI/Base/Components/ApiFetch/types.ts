import * as React from 'react'
import { ResponseResultStatusEnum, RequestMethodEnum, QueryStringType } from '../../../../requests/types';
import { PaginationStatusType } from '../Pagination/types';

export declare type FetchStatusType = {
  data?: any
  status: ResponseResultStatusEnum
  errorMsg?: string
}

export declare type FetchStatusPropType = {
  fetchStatus: FetchStatusType,
  onCloseClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
}

export declare type UseFetchStatusInputType<T = any> = {
  path: string
  method?: RequestMethodEnum
  queryString?: QueryStringType
}

export declare type UseFetchStatusOutputType = {
  fetchStatus: FetchStatusType
  refreshStatus: number
  handleRefreshClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
  handleFetchStatusCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
}

