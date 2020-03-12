import { PaginationStatusType } from "Components/Pagination/types";
import { FilterType } from "Components/BlogFilterSort/types";
import { SortType } from "domain/blog/Sort";
import { FetchDataArgType } from "Hooks/Request/types";
import { BlogType } from "domain/blog/BlogType";

export declare type UseBlogFilterSortTypeAheadInputType = {
  currentPaginationStatus: PaginationStatusType
  currentFilters: FilterType
  currentSort: number
  sendRequest: (args: FetchDataArgType) => Promise<any | void >
  isRefresh: boolean
  setBlogs: React.Dispatch<React.SetStateAction<BlogType[]>>
  setPaginationStatus: React.Dispatch<React.SetStateAction<PaginationStatusType>>
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>
  currentRefreshCount: number 
}

export declare type UseBlogFilterSortTypeAheadOutputType = {
}


