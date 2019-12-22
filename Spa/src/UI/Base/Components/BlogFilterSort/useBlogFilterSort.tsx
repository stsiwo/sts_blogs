import { UseBlogFilterSortInput, UseBlogFilterSortOutput, FilterType, TagType } from "./types";
import * as React from 'react'


export const useBlogFilterSort = (input: UseBlogFilterSortInput): UseBlogFilterSortOutput => {

  const initialTags: TagType[] = input.initialTags ? input.initialTags : []
  const initialKeyword: string = input.initialKeyword ? input.initialKeyword : '' 

  const [currentFilters, setFilters] = React.useState<FilterType>({
    tags: initialTags,
    startDate: null,
    endDate: null,
    keyword: initialKeyword 
  })
  const [currentSort, setSort] = React.useState<number>(0)

  return {
    currentFilters: currentFilters,
    currentSort: currentSort,
    setFilters: setFilters,
    setSort: setSort
  }
}
