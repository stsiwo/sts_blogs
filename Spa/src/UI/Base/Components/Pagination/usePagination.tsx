import * as React from 'react'
import { UsePaginationInputType, UsePaginationOutputType, PaginationStatusType } from "./types";


export const usePagination = (input: UsePaginationInputType): UsePaginationOutputType => {
  const [currentPaginationStatus, setPaginationStatus] = React.useState<PaginationStatusType>({
    offset: 0,
    limit: 20,
    totalCount: 0
  })

  const handlePageClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    const nextPageOffset: number = parseInt(e.currentTarget.value)
    setPaginationStatus({
      offset: nextPageOffset,
      limit: currentPaginationStatus.limit,
      totalCount: currentPaginationStatus.totalCount
    })
  }

  const handlePageLimitChangeEvent: React.EventHandler<React.ChangeEvent<HTMLSelectElement>> = (e) => {
    const nextPageLimit: number = parseInt(e.currentTarget.value)
    setPaginationStatus({
      offset: currentPaginationStatus.offset,
      limit: nextPageLimit, 
      totalCount: currentPaginationStatus.totalCount
    })
  }

  return {
    paginationStatus: currentPaginationStatus,
    setPaginationStatus: setPaginationStatus,
    handlePageClickEvent: handlePageClickEvent,
    handlePageLimitChangeEvent: handlePageLimitChangeEvent
  }
}
