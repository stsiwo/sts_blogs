import { UseBlogFilterSortTypeAheadInputType, UseBlogFilterSortTypeAheadOutputType } from "./types";
import * as React from "react";
import { Subject, from } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import { logger } from 'configs/logger';
import { useRequest } from "Hooks/Request/useRequest";
import { RequestMethodEnum, ResponseResultType, BlogListResponseDataType, ResponseResultStatusEnum } from "requests/types";
import { appConfig } from "configs/appConfig";
import { TagType } from "domain/tag/TagType";
const log = logger("useBlogFilterSortTypeAhead");

export const useBlogFilterSortTypeAhead = (input: UseBlogFilterSortTypeAheadInputType): UseBlogFilterSortTypeAheadOutputType => {

  /**
   * need to use 'useState'. 
   * this is because to prevent react from recreate new Subject object every time this component re-rendered.
   *  - that's why 'debounceTime' does not work since every time create new subject object there is not continuous input at all.
   **/
  const [curSortFilterBlogSubject$, setSortFilterBlogSubject] = React.useState<Subject<any>>(new Subject<any>())

  const queryString = {
    page: input.currentPaginationStatus.page,
    limit: input.currentPaginationStatus.limit,
    tags: input.currentFilters.tags.map((tag: TagType) => tag.name),
    startDate: input.currentFilters.startDate ? input.currentFilters.startDate.toJSON() : null,
    endDate: input.currentFilters.endDate ? input.currentFilters.endDate.toJSON() : null,
    keyword: input.currentFilters.keyword,
    sort: input.currentSort,
  }

  React.useEffect(() => {
    log("start filter sort change useEffect")
    // might can move to inside eh of refresh click
    log('before request')
    log(input.currentFilters)

    const subscription = curSortFilterBlogSubject$
      .pipe(
        debounceTime(appConfig.debounceTime),
        tap((value: string) => log("passed debounceTime with: " + value)),
        distinctUntilChanged(),
        tap((value: string) => log("passed distinctUntilChanged with: " + value)),
        switchMap((value: string) => {
          log("switchMap before request")
          return from(input.sendRequest({
            path: input.path,
            method: RequestMethodEnum.GET,
            queryString: queryString,
            ...(input.isRefresh && { useCache: false }),
          }))
        }),
        tap((value: ResponseResultType) => log("passed switchMap with: " + value)),
        map((result: ResponseResultType<BlogListResponseDataType>) => {
          log("receive response from server at rxjs map")
          if (result.status === ResponseResultStatusEnum.SUCCESS) {
            log('fetch blog list success.')
            log(result.data.blogs)
            input.setBlogs(result.data.blogs)
            // assign new total count of pagination
            input.setPaginationStatus({
              ...input.currentPaginationStatus,
              totalCount: result.data.totalCount
            })
          }
          input.setIsRefresh(false)
        }),
      )
      .subscribe((value) => log("blog filter sort type ahead subscribe function with: " + value))

    curSortFilterBlogSubject$.next(queryString)
    // don't forget to unsubscribe for prevent memory leak
    return () => subscription.unsubscribe()
  }, [
      JSON.stringify(queryString),
      input.currentRefreshCount
    ])

  return {
  }
}


