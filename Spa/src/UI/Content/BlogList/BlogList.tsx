import { toggleFilterSortBarActionCreator } from 'actions/creators';
import { CancelTokenSource } from 'axios';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
import BlogFilterSort from 'Components/BlogFilterSort/BlogFilterSort';
import { useBlogFilterSort } from 'Components/BlogFilterSort/useBlogFilterSort';
import BlogItem from 'Components/BlogItem/BlogItem';
import PageLimitSelect from 'Components/Pagination/PageLimitSelect';
import Pagination from 'Components/Pagination/Pagination';
import { usePagination } from 'Components/Pagination/usePagination';
import { BlogType } from 'domain/blog/BlogType';
import { TagType } from 'domain/tag/TagType';
import { useRequest } from 'Hooks/Request/useRequest';
import { useResponsive } from 'Hooks/Responsive/useResponsive';
import * as React from 'react';
import { MdCancel, MdRefresh, MdSettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BlogListResponseDataType, RequestMethodEnum, ResponseResultStatusEnum } from 'requests/types';
import { StateType } from 'states/types';
import { getBlogTestData } from '../../../../tests/data/BlogFaker';
import './BlogList.scss';
import BlogListController from 'Components/BlogListController/BlogListController';
import BePartOfIt from 'Components/BePartOfIt/BePartOfIt';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import ManageYourBlogs from 'Components/ManageYourBlogs/ManageYourBlogs';
import { useLocation } from 'react-router';
var debug = require('debug')('ui:BlogList')

declare type FetchResultType = {
  status: ResponseResultStatusEnum
  errorMsg?: string
}

export declare type CancelTokenSourceProto = {
  cancelTokenSource: CancelTokenSource
  id: number
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BlogList: React.FunctionComponent<{}> = (props: {}) => {

  const path = '/blogs'
  const query = useQuery()
  /** state **/
  const [currentBlogs, setBlogs] = React.useState([] as BlogType[])

  /** redux **/
  const isFilterSortBarOpen = useSelector((state: StateType) => state.ui.isFilterSortBarOpen)

  /** hooks **/
  const currentScreenSize = useResponsive()
  const dispatch = useDispatch()
  const { currentPaginationStatus, setPaginationStatus } = usePagination({})
  const { currentFilters, currentSort, setFilters, setSort } = useBlogFilterSort({
    initialTags: query.get('tags') ? [
      {
        name: query.get('tags') 
      }
    ] : [],
    initialKeyword: query.get('keyword')
  })
  const { currentRequestStatus: currentInitialBlogsFetchStatus, setRequestStatus: setInitialBlogsFetchStatus, sendRequest: sendBlogsFetchRequest, currentCancelSource } = useRequest({})
  const [currentRefreshCount, setRefreshCount] = React.useState<number>(null)
  const { auth } = useAuthContext()

  const queryString = {
    page: currentPaginationStatus.page,
    limit: currentPaginationStatus.limit,
    tags: currentFilters.tags.map((tag: TagType) => tag.name),
    startDate: currentFilters.creationDate.start ? currentFilters.creationDate.start.toJSON() : null,
    endDate: currentFilters.creationDate.end ? currentFilters.creationDate.end.toJSON() : null,
    keyword: currentFilters.keyword,
    sort: currentSort,
  }

  React.useEffect(() => {
    debug("start useEffect")
    // might can move to inside eh of refresh click
    console.log('before request')
    console.log(currentFilters)

    debug("start send blog fetch request")
    sendBlogsFetchRequest({
      path: path,
      method: RequestMethodEnum.GET,
      queryString: queryString
    })
      .then((data: BlogListResponseDataType) => {
        if (data) {
          setBlogs(data.blogs)
          // assign new total count of pagination
          setPaginationStatus({
            ...currentPaginationStatus,
            totalCount: data.totalCount
          })
        }
      })
  }, [
      JSON.stringify(queryString),
      currentRefreshCount
    ])

  /** EH **/
  const handleFilterSortNavClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    dispatch(toggleFilterSortBarActionCreator(true))
  }

  const handleFilterSortNavCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    dispatch(toggleFilterSortBarActionCreator(false))
  }

  const handleRefreshClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = async (e) => {
    debug("start handling refresh click")
    const nextRefreshCount = currentRefreshCount + 1
    setRefreshCount(nextRefreshCount)
  }

  const handleCancelClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    debug('handle cancel click')
    debug(currentCancelSource)
    currentCancelSource.cancel("refresh request is canceled")
  }

  /** render **/
  const renderBlogs = (blogList: BlogType[]): React.ReactNode => {
    return blogList.map((blog: BlogType) => {
      return (
        <BlogItem blog={blog} />
      )
    })
  }

  const renderTags = (tagList: TagType[]): React.ReactNode => {
    return tagList.map((tag: TagType) => <div className="blog-list-filter-tags-tag" key={tag.name}>{tag.name}</div>)
  }

  // maybe can reuse frame (structure of element) of Home.tsx
  // #REFACTOR
  return (
    <div className="context-wrapper">
      <div className="main-wrapper">
        <BlogListController
          currentFetchStatus={currentInitialBlogsFetchStatus}
          setFetchStatus={setInitialBlogsFetchStatus}
          handleRefreshClickEvent={handleRefreshClickEvent}
          handleCancelClickEvent={handleCancelClickEvent}
          handleFilterSortNavClickEvent={handleFilterSortNavClickEvent}
          currentPaginationStatus={currentPaginationStatus}
          setPaginationStatus={setPaginationStatus}
        />
        <div className="blog-list-items-wrapper">
          {(currentInitialBlogsFetchStatus.status === ResponseResultStatusEnum.FETCHING && <p role="fetching">fetching ... </p>)}
          {(currentInitialBlogsFetchStatus.status !== ResponseResultStatusEnum.FETCHING && currentBlogs.length === 0 && <p>blogs are empty</p>)}
          {(currentInitialBlogsFetchStatus.status !== ResponseResultStatusEnum.FETCHING && currentBlogs.length !== 0 && renderBlogs(currentBlogs))}
        </div>
        <Pagination currentPaginationStatus={currentPaginationStatus} setPaginationStatus={setPaginationStatus} />
      </div>
      <div className="aside-wrapper">
        {(!auth.authed &&
          <BePartOfIt />
        )}
        {(auth.authed &&
          <ManageYourBlogs />
        )}
        <BlogFilterSort
          currentFilters={currentFilters}
          currentSort={currentSort}
          setFilters={setFilters}
          setSort={setSort}
        />
      </div>
    </div>
  );
}

export default BlogList;




