import * as React from 'react'
import { FetchStatusType } from 'Components/ApiFetch/types';
import { PaginationStatusType } from 'Components/Pagination/types';

export declare type BlogListControllerPropType = {
  currentFetchStatus: FetchStatusType
  setFetchStatus: React.Dispatch<React.SetStateAction<FetchStatusType>>
  handleRefreshClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>>
  handleCancelClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>>
  handleFilterSortNavClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>>
  currentPaginationStatus: PaginationStatusType
  setPaginationStatus: React.Dispatch<React.SetStateAction<PaginationStatusType>>
}


