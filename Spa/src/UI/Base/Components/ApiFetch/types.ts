import * as React from 'react'
import { ResponseResultStatusEnum } from '../../../../requests/types';

declare type FetchStatusType = {
  status: ResponseResultStatusEnum
  errorMsg?: string
}

export declare type FetchStatusPropType = {
  fetchStatus: FetchStatusType,
  onCloseClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
}

export declare type RefreshBtnPropType = {
}
