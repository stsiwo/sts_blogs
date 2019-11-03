import { UseBlogFilterSortInput, UseBlogFilterSortOutput, FilterType } from "./types";
import * as React from 'react'


export const useBlogFilterSort = (input: UseBlogFilterSortInput): UseBlogFilterSortOutput => {

  const [currentFilters, setFilters] = React.useState<FilterType>({
    tags: [],
    creationDate: {},
    keyword: ''
  })
  const [currentSort, setSort] = React.useState<number>(0)

  return {
    filters: currentFilters,
    sort: currentSort,
    setFilters: setFilters,
    setSort: setSort
  }
}
