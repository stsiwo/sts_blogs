import { CancelTokenSource } from "axios";
import { RequestMethodEnum, QueryStringType, ResponseResultStatusEnum } from "../../../../requests/types";

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

export declare type UseRefreshStatusInputType<T = any> = {
}

export declare type UseRefreshStatusOutputType = {
  currentRefreshStatus: RefreshStatusType
  setRefreshStatus: React.Dispatch<React.SetStateAction<RefreshStatusType>>
}

