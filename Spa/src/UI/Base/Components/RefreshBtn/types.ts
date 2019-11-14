import { CancelTokenSource } from "axios";
import { RequestMethodEnum, QueryStringType, ResponseResultStatusEnum } from "requests/types";
import { RequestStatusType } from "Hooks/Request/types";
import { CancelTokenSourceProto } from "ui/Content/BlogList/BlogList";

export declare type RefreshStatusType = {
  data?: any
  status: ResponseResultStatusEnum
  errorMsg?: string
}

export declare type RefreshBtnPropType = {
  currentRefreshStatus: RefreshStatusType
  setRefreshStatus: React.Dispatch<React.SetStateAction<RefreshStatusType>>
  path: string
  method?: RequestMethodEnum
  queryString?: QueryStringType
  callback?: (data: any) => void
  enableCancel: boolean
}

export declare type RefreshBtnProtoPropType = {
  currentFetchStatus: RequestStatusType 
  currentRefreshCount: number
  setRefreshCount: React.Dispatch<React.SetStateAction<number>>
  currentCancelSource: CancelTokenSource
}

export declare type UseRefreshStatusInputType<T = any> = {
}

export declare type UseRefreshStatusOutputType = {
  currentRefreshStatus: RefreshStatusType
  setRefreshStatus: React.Dispatch<React.SetStateAction<RefreshStatusType>>
}

