import { Subject } from "rxjs";
import { RequestStatusType } from "Hooks/Request/types";
import { RequestMethodEnum } from "requests/types";

export declare type UseTypeAheadInputType = {
  url: string
  method?: RequestMethodEnum
}

export declare type UseTypeAheadOutputType = {
  subject$: Subject<string>
  currentRequestStatus: RequestStatusType 
}

