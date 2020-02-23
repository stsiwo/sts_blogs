import * as React from 'react'
import { PaginationStatusType } from 'Components/Pagination/types';

export declare type BlogFilterSortPropType = {
  currentFilters: FilterType
  currentSort: number
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>
  setSort: React.Dispatch<React.SetStateAction<number>>
  setPaginationStatus: React.Dispatch<React.SetStateAction<PaginationStatusType>>
}

export declare type TagType = {
  name: string
}

export declare type FilterType = {
  tags: TagType[]
  startDate: Date
  endDate: Date
  keyword: string
}

export declare type UseBlogFilterSortInput = {
  initialTags?: TagType[]
  initialKeyword?: string
}

export declare type UseBlogFilterSortOutput = {
  currentFilters: FilterType
  currentSort: number
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>
  setSort: React.Dispatch<React.SetStateAction<number>>
}

