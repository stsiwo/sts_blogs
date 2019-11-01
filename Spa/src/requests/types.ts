export enum ResponseResultStatus {
  SUCCESS,
  FAILURE,
}

export declare type ResponseResult = {
  data: any
  status: ResponseResultStatus
  errorMsg?: string 
}
