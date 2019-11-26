import { BlogType } from 'domain/blog/BlogType';
import { TagType } from 'domain/tag/TagType';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RequestMethodEnum, ResponseResultStatusEnum, BlogListResponseDataType } from 'requests/types';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
import BlogFilterSort from 'Components/BlogFilterSort/BlogFilterSort';
import { useBlogFilterSort } from 'Components/BlogFilterSort/useBlogFilterSort';
import PageLimitSelect from 'Components/Pagination/PageLimitSelect';
import Pagination from 'Components/Pagination/Pagination';
import { usePagination } from 'Components/Pagination/usePagination';
import RefreshBtn from 'Components/RefreshBtn/RefreshBtn';
import { useRefreshBtn } from 'Components/RefreshBtn/useRefreshBtn';
import { useCssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';
import { toggleFilterSortBarActionCreator } from 'actions/creators';
import { StateType } from 'states/types';
import './BlogList.scss';
import { useRequest } from 'Hooks/Request/useRequest';
import { CancelTokenSource } from 'axios';
import { getCancelTokenSource } from 'requests/request';
import RefreshBtnProto from 'Components/RefreshBtn/RefreshBtnProto';
import { useResponsive } from 'Hooks/Responsive/useResponsive';
import { MdCancel, MdRefresh, MdSettings } from 'react-icons/md';
var debug = require('debug')('ui:BlogList')

declare type FetchResultType = {
  status: ResponseResultStatusEnum
  errorMsg?: string
}

export declare type CancelTokenSourceProto = {
  cancelTokenSource: CancelTokenSource
  id: number
}

const BlogList: React.FunctionComponent<{}> = (props: {}) => {

  const path = '/blogs'
  /** state **/
  const [currentBlogs, setBlogs] = React.useState([] as BlogType[])

  /** redux **/
  const isFilterSortBarOpen = useSelector((state: StateType) => state.ui.isFilterSortBarOpen)

  /** hooks **/
  const currentScreenSize = useResponsive()
  const cssGlobal = useCssGlobalContext()
  const dispatch = useDispatch()
  const { currentPaginationStatus, setPaginationStatus } = usePagination({})
  const { currentFilters, currentSort, setFilters, setSort } = useBlogFilterSort({})
  const { currentRequestStatus: currentInitialBlogsFetchStatus, setRequestStatus: setInitialBlogsFetchStatus, sendRequest: sendBlogsFetchRequest, currentCancelSource } = useRequest({})
  const [currentRefreshCount, setRefreshCount] = React.useState<number>(null)

  const queryString = {
    offset: currentPaginationStatus.offset,
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

  const handleCancelClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    debug('handle cancel click')
    debug(currentCancelSource)
    currentCancelSource.cancel("refresh request is canceled")
  }

  /** render **/
  const renderBlogLists = (blogList: BlogType[]): React.ReactNode => {
    return blogList.map((blog: BlogType) => {
      return (
        <Link to={`/blog/${blog.id}`} className="blog-list-items-item-wrapper" key={blog.id} role="blog-item">
          <h3 className="blog-list-items-item-title">{blog.title}</h3>
        </Link>
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
        <div className="blog-list-controller-wrapper">
          <div className="icon-wrapper" onClick={handleRefreshClickEvent}>

            {(currentInitialBlogsFetchStatus.status !== ResponseResultStatusEnum.FETCHING &&
              <MdRefresh className="icon" />
            )}
            {(currentInitialBlogsFetchStatus.status === ResponseResultStatusEnum.FETCHING &&
              <MdCancel className="icon" />
            )}
          </div>
          <div className="icon-wrapper" onClick={handleFilterSortNavClickEvent}>
            <MdSettings className="icon" />
          </div>
        </div>
        <PageLimitSelect currentPaginationStatus={currentPaginationStatus} setPaginationStatus={setPaginationStatus} />
        <div className="blog-list-items-wrapper">
          {(currentInitialBlogsFetchStatus.status === ResponseResultStatusEnum.FETCHING && <p role="fetching">fetching ... </p>)}
          {(currentInitialBlogsFetchStatus.status !== ResponseResultStatusEnum.FETCHING && currentBlogs.length === 0 && <p>blogs are empty</p>)}
          {(currentInitialBlogsFetchStatus.status !== ResponseResultStatusEnum.FETCHING && currentBlogs.length !== 0 && renderBlogLists(currentBlogs))}
        </div>
        <div className="blog-list-pagination-wrapper">
          <Pagination currentPaginationStatus={currentPaginationStatus} setPaginationStatus={setPaginationStatus} />
        </div>
      </div>
      <div className="aside-wrapper">
        <div className="be-part-of-it-wrapper">
          <h2 className="be-part-of-it-title">Be Part of It</h2>
          <p className="be-part-of-it-desc">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
          <button className="btn">Join</button>
        </div>
        <BlogFilterSort currentFilters={currentFilters} currentSort={currentSort} setFilters={setFilters} setSort={setSort} />
      </div>
    </div>
  );
}

export default BlogList;




