import * as React from 'react';
import { request, getCancelTokenSource } from 'requests/request';
import { ResponseResultStatusEnum, ResponseResultType, QueryStringType } from "requests/types";
import { buildQueryString } from '../../../../utils'
import { AxiosError, CancelTokenSource } from 'axios';
import { api } from 'requests/api';
import { UseRefreshStatusInputType, UseRefreshStatusOutputType, RefreshStatusType } from './types';


export const useRefreshBtn = (input: UseRefreshStatusInputType): UseRefreshStatusOutputType => {

  const [currentRefreshStatus, setRefreshStatus] = React.useState<RefreshStatusType>({
    status: ResponseResultStatusEnum.INITIAL
  })

  return {
    currentRefreshStatus: currentRefreshStatus,
    setRefreshStatus: setRefreshStatus,
  }
}

