import * as React from 'react'
import { ResponseResultStatusEnum, RequestMethodEnum, QueryStringType } from '../../../../requests/types';

export declare type FetchStatusType = {
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
  queryString: QueryStringType
  setDomainList: React.Dispatch<React.SetStateAction<T>>


}

export declare type UseFetchStatusOutputType = {
  fetchStatus: FetchStatusType
  refreshStatus: number
  handleRefreshClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
  handleFetchStatusCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
}

