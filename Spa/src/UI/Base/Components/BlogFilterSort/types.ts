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

export declare type DateRangeType = {
  start?: Date
  end?: Date
}

export declare type FilterType = {
  tags: TagType[]
  creationDate: DateRangeType
  keyword: string
}

export declare type UseBlogFilterSortInput = {
}

export declare type UseBlogFilterSortOutput = {
  currentFilters: FilterType
  currentSort: number
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>
  setSort: React.Dispatch<React.SetStateAction<number>>
}

