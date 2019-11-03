import * as React from 'react';
import { request } from '../../../../requests/request';
import { ResponseResultStatusEnum, ResponseResultType, QueryStringType } from "../../../../requests/types";
import { FetchStatusType, UseFetchStatusInputType, UseFetchStatusOutputType } from "./types";
import { buildQueryString } from '../../../../utils'


export const useApiFetch = <T extends {} = any>(input: UseFetchStatusInputType): UseFetchStatusOutputType => {

  const [currentFetchStatus, setFetchStatus] = React.useState<FetchStatusType>({
    status: ResponseResultStatusEnum.INITIAL
  })
  const [currentRefreshStatus, setRefreshStatus] = React.useState(0)

  const encodedQueryString = buildQueryString(input.queryString)

  React.useEffect(() => {

    async function blogsApiFetch() {
      setFetchStatus({
        status: ResponseResultStatusEnum.FETCHING,
      })
      const fetchResult: ResponseResultType = await request({
        url: input.path + encodedQueryString, 
        ...(input.method && { method: input.method })
      })

      const fetchedDomains: T[] = fetchResult.data ? fetchResult.data.blogs : []
      input.setPaginationStatus({
        offset: fetchResult.data && fetchResult.data.offset ? fetchResult.data.offset : 0,
        limit: fetchResult.data && fetchResult.data.limit ? fetchResult.data.limit : 20,
        totalCount: fetchResult.data && fetchResult.data.totalCount ? fetchResult.data.totalCount : 1000,
      })
      console.log(input.queryString)
      input.setDomainList(fetchedDomains)
      setFetchStatus({
        status: fetchResult.status,
        ...(fetchResult.errorMsg && { errorMsg: fetchResult.errorMsg }),
      })
    }
    console.log(input.queryString)
    blogsApiFetch()

    return () => {
    }
  }, [
    currentRefreshStatus,
    encodedQueryString 
  ])

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

