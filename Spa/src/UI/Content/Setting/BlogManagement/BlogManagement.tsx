import { toggleFilterSortBarActionCreator } from 'actions/creators';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
import BlogFilterSort from 'Components/BlogFilterSort/BlogFilterSort';
import { useBlogFilterSort } from 'Components/BlogFilterSort/useBlogFilterSort';
import PageLimitSelect from 'Components/Pagination/PageLimitSelect';
import Pagination from 'Components/Pagination/Pagination';
import { usePagination } from 'Components/Pagination/usePagination';
import RefreshBtn from 'Components/RefreshBtn/RefreshBtn';
import { useRefreshBtn } from 'Components/RefreshBtn/useRefreshBtn';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { useCssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';
import { BlogType } from 'domain/blog/BlogType';
import { TagType } from 'domain/tag/TagType';
import { useRequest } from 'Hooks/Request/useRequest';
import * as React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { BlogListResponseDataType, RequestMethodEnum, ResponseResultStatusEnum, ResponseResultType } from 'requests/types';
import { StateType } from 'states/types';
import { dateFormatOption } from '../../../../utils';
import './BlogManagement.scss';
import BlogListController from 'Components/BlogListController/BlogListController';
import BlogItem from 'Components/BlogItem/BlogItem';
import { getBlogTestData } from '../../../../../tests/data/BlogFaker';
var debug = require('debug')('ui:BlogManagement')

const BlogManagement: React.FunctionComponent<{}> = (props: {}) => {


  /** refs **/
  const controllerRefs: Map<string, React.MutableRefObject<HTMLDivElement>> = new Map()

  /** state **/
  const [currentBlogs, setBlogs] = React.useState([] as BlogType[])

  /** redux **/
  const isFilterSortBarOpen = useSelector((state: StateType) => state.ui.isFilterSortBarOpen)

  /** hooks **/
  const { auth } = useAuthContext()
  const userId = auth.user.id
  const dispatch = useDispatch()
  const { path, url } = useRouteMatch();
  const { currentPaginationStatus, setPaginationStatus } = usePagination({})
  const { currentFilters, currentSort, setFilters, setSort } = useBlogFilterSort({})
  const { currentRequestStatus: currentInitialBlogsFetchStatus, setRequestStatus: setInitialBlogsFetchStatus, sendRequest: sendBlogsFetchRequest, currentCancelSource: currentFetchCancelSource } = useRequest({})
  const { currentRequestStatus: currentDeleteRequestStatus, setRequestStatus: setDeleteRequestStatus, sendRequest: sendDeleteRequest, currentCancelSource: currentDeleteCancelSource } = useRequest({})
  const [currentRefreshCount, setRefreshCount] = React.useState<number>(null)

  const queryString = {
    page: currentPaginationStatus.page,
    limit: currentPaginationStatus.limit,
    tags: currentFilters.tags.map((tag: TagType) => tag.name),
    startDate: currentFilters.startDate ? currentFilters.startDate.toJSON() : null,
    endDate: currentFilters.endDate ? currentFilters.endDate.toJSON() : null,
    keyword: currentFilters.keyword,
    sort: currentSort,
  }

  React.useEffect(() => {
    debug("start useEffect")
    // might can move to inside eh of refresh click

    debug("start send blog fetch request")
    sendBlogsFetchRequest({
      path: '/users/' + userId + '/blogs',
      method: RequestMethodEnum.GET,
      queryString: queryString,
    })
      .then((result: ResponseResultType<BlogListResponseDataType>) => {

        if (NODE_ENV === 'development') {
          console.log("development env so inject blog test data")
          setBlogs(getBlogTestData())
        }
        else if (result.status === ResponseResultStatusEnum.SUCCESS) {
          console.log("fetch success and receive data")
          console.log(result.data)
          setBlogs(result.data.blogs)

          // assign new total count of pagination
          setPaginationStatus({
            ...currentPaginationStatus,
            totalCount: result.data.totalCount
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

  const handleDeleteBlogClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    sendDeleteRequest({
      path: '/users/' + userId + '/blogs',
      method: RequestMethodEnum.DELETE,
    })
      .then((data: BlogListResponseDataType) => {
        // operation after successful delete request
      })
  }

  const handleRefreshClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = async (e) => {
    debug("start handling refresh click")
    const nextRefreshCount = currentRefreshCount + 1
    setRefreshCount(nextRefreshCount)
  }

  const handleFetchCancelClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    debug('handle cancel click')
    debug(currentFetchCancelSource)
    currentFetchCancelSource.cancel("refresh request is canceled")
  }

  const handleDeleteCancelClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    debug('handle cancel click')
    debug(currentDeleteCancelSource)
    currentDeleteCancelSource.cancel("delete request is canceled")
  }
  /** render **/
  const renderBlogs = (blogs: BlogType[]): React.ReactNode => {
    return blogs.map((blog: BlogType) => {
      return (
        <BlogItem blog={blog} handleDeleteBlogClickEvent={handleDeleteBlogClickEvent} isEditDeleteOverlay />
      )
    })
  }

  return (
    <div className="context-wrapper">
      <div className="main-wrapper">
        <h2 className="page-title">Blog Management</h2>
        <BlogListController
          currentFetchStatus={currentInitialBlogsFetchStatus}
          setFetchStatus={setInitialBlogsFetchStatus}
          handleRefreshClickEvent={handleRefreshClickEvent}
          handleCancelClickEvent={handleFetchCancelClickEvent}
          handleFilterSortNavClickEvent={handleFilterSortNavClickEvent}
          currentPaginationStatus={currentPaginationStatus}
          setPaginationStatus={setPaginationStatus}
        />

        {/** how to deal with another request rather than initial fetch **/}
        <FetchStatus
          currentFetchStatus={currentDeleteRequestStatus}
          setFetchStatus={setDeleteRequestStatus}
          fetchingMsg={'deleting...'}
          successMsg={'ok'}
          failureMsg={'failed'}
        />
        <div className="blog-management-items-wrapper">
          {(NODE_ENV === 'development' && currentBlogs.length !== 0 && renderBlogs(currentBlogs))}
          {(currentInitialBlogsFetchStatus.status === ResponseResultStatusEnum.FETCHING && <p role="fetching">fetching ... </p>)}
          {(currentInitialBlogsFetchStatus.status === ResponseResultStatusEnum.FAILURE && <p>sorry.. blogs are not currently available...</p>)}
          {(currentInitialBlogsFetchStatus.status === ResponseResultStatusEnum.SUCCESS && currentBlogs.length === 0 && <p>there is no blog based on the your sort & filter</p>)}
          {(currentInitialBlogsFetchStatus.status === ResponseResultStatusEnum.SUCCESS && currentBlogs.length !== 0 && renderBlogs(currentBlogs))}
        </div>
        <Pagination
          currentPaginationStatus={currentPaginationStatus}
          setPaginationStatus={setPaginationStatus}
        />
      </div>
      <div className="aside-wrapper">
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

export default BlogManagement;




