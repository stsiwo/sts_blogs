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

export declare type UsePaginationResultType = {
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
