import * as React from 'react';
import { request } from '../../../../requests/request';
import { ResponseResultStatusEnum, ResponseResultType } from "../../../../requests/types";
import { FetchStatusType, UseFetchStatusInputType, UseFetchStatusOutputType } from "./types";
import { buildQueryString } from '../../../../utils'


export const useApiFetch = <T extends {} = any>(input: UseFetchStatusInputType): UseFetchStatusOutputType => {

  const [currentFetchStatus, setFetchStatus] = React.useState<FetchStatusType>({
    status: ResponseResultStatusEnum.INITIAL
  })
  const [currentRefreshStatus, setRefreshStatus] = React.useState(0)

  React.useEffect(() => {

    async function blogsApiFetch() {
      setFetchStatus({
        status: ResponseResultStatusEnum.FETCHING,
      })
      const fetchResult: ResponseResultType = await request({
        url: input.path + buildQueryString(input.queryString),
        ...(input.method && { method: input.method })
      })

      const fetchedDomains: T[] = fetchResult.data ? fetchResult.data.blogs : []
      input.setPaginationStatus({
        offset: fetchResult.data && fetchResult.data.offset ? fetchResult.data.offset : 0,
        limit: fetchResult.data && fetchResult.data.limit ? fetchResult.data.limit : 20,
        totalCount: fetchResult.data && fetchResult.data.totalCount ? fetchResult.data.totalCount : 1000,
      })
      input.setDomainList(fetchedDomains)
      setFetchStatus({
        status: fetchResult.status,
        ...(fetchResult.errorMsg && { errorMsg: fetchResult.errorMsg }),
      })
    }
    blogsApiFetch()

    return () => {
    }
  }, [currentRefreshStatus, ...Object.values(input.queryString)])

  const handleRefreshClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    const nextStatus = currentRefreshStatus + 1
    setRefreshStatus(nextStatus)
  }

  const handleFetchStatusCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    setFetchStatus({
      status: ResponseResultStatusEnum.INITIAL
    })
  }

  return {
    fetchStatus: currentFetchStatus,
    refreshStatus: currentRefreshStatus,
    handleRefreshClickEvent: handleRefreshClickEvent,
    handleFetchStatusCloseClickEvent: handleFetchStatusCloseClickEvent,
  }
}
