import * as React from 'react'

export declare type PaginationPropType = {
  currentPaginationStatus: PaginationStatusType
  setPaginationStatus: React.Dispatch<React.SetStateAction<PaginationStatusType>>
  pageCss?: string
  currentPageCss?: string
  hoverPageCss?: string
}

export declare type PageLimitSelectPropType = {
  currentPaginationStatus: PaginationStatusType
  setPaginationStatus: React.Dispatch<React.SetStateAction<PaginationStatusType>>
}

export declare type PaginationStatusType = {
  offset: number
  limit: number
  totalCount: number
}

export declare type UsePaginationInputType = {
}

export declare type UsePaginationOutputType = {
  currentPaginationStatus: PaginationStatusType
  setPaginationStatus: React.Dispatch<React.SetStateAction<PaginationStatusType>>
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
