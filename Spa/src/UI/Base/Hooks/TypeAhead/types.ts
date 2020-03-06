import { Subject } from "rxjs";
import { RequestStatusType } from "Hooks/Request/types";
import { RequestMethodEnum } from "requests/types";

export declare type UseTypeAheadInputType = {
  url: string
  method?: RequestMethodEnum
  headers?: any
  dataBuilder?: (data: any) => any
}

export declare type UseTypeAheadOutputType = {
  subject$: Subject<string>
  currentRequestStatus: RequestStatusType 
}

