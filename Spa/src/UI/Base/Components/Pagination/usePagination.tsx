import * as React from 'react'
import { UsePaginationInputType, UsePaginationOutputType, PaginationStatusType } from "./types";


export const usePagination = (input: UsePaginationInputType): UsePaginationOutputType => {
  const [currentPaginationStatus, setPaginationStatus] = React.useState<PaginationStatusType>({
    offset: 0,
    limit: 20,
    totalCount: 0
  })

  return {
    currentPaginationStatus: currentPaginationStatus,
    setPaginationStatus: setPaginationStatus,
  }
}
