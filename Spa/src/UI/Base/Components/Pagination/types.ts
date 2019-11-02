import * as React from 'react'

export declare type PaginationPropType = {
  offset: number
  totalCount: number
  limit: number
  onClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
  pageCss?: string
  currentPageCss?: string
  hoverPageCss?: string
}

export declare type PaginationStatusType = {
  offset: number
  limit: number
  totalCount: number
}

export declare type UsePaginationInputType = {
}

export declare type UsePaginationOutputType = {
  paginationStatus: PaginationStatusType
  setPaginationStatus: React.Dispatch<React.SetStateAction<PaginationStatusType>>
  handlePageClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
  handlePageLimitChangeEvent: React.EventHandler<React.ChangeEvent<HTMLSelectElement>>
}

export declare type BuildPaginationResultType = {
  pageList: PageType[]
  maxPageNum: number
  maxPageNumOffset: number
}

/** type for each page button **/
export declare type PageType = {
  /** page number of the page button **/
  pageNum: number
  offset: number
  /** css for the page button **/
  /** either non-selected or selected **/
  css: string
}
