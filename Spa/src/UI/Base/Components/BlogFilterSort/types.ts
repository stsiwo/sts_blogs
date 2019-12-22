import * as React from 'react'

export declare type BlogFilterSortPropType = {
  currentFilters: FilterType
  currentSort: number
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>
  setSort: React.Dispatch<React.SetStateAction<number>>
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

