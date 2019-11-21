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
import { useResponsiveComponent } from 'Hooks/ResponsiveComponentHook';
import * as React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { BlogListResponseDataType, RequestMethodEnum, ResponseResultStatusEnum } from 'requests/types';
import { StateType } from 'states/types';
import { dateFormatOption } from '../../../../utils';
import './BlogManagement.scss';
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
  const currentWidth = useResponsiveComponent()
  const cssGlobal = useCssGlobalContext()
  const { path, url } = useRouteMatch();
  const { currentPaginationStatus, setPaginationStatus } = usePagination({})
  const { currentFilters, currentSort, setFilters, setSort } = useBlogFilterSort({})
  const { currentRequestStatus: currentInitialBlogsFetchStatus, setRequestStatus: setInitialBlogsFetchStatus, sendRequest: sendBlogsFetchRequest, currentCancelSource: currentFetchCancelSource } = useRequest({})
  const { currentRequestStatus: currentDeleteRequestStatus, setRequestStatus: setDeleteRequestStatus, sendRequest: sendDeleteRequest, currentCancelSource: currentDeleteCancelSource } = useRequest({})
  const [currentRefreshCount, setRefreshCount] = React.useState<number>(null)
  const callbackAfterApiFetch = (data: BlogListResponseDataType): void => {
    // assign fetched blogs data to this state
    if (data) {
      setBlogs(data.blogs)

      // assign new total count of pagination
      setPaginationStatus({
        ...currentPaginationStatus,
        totalCount: data.totalCount
      })
    }
  }

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
      path: '/users/' + userId + '/blogs',
      method: RequestMethodEnum.GET,
      queryString: queryString,
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
  const handleBlogControllerOpenClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    controllerRefs.get(e.currentTarget.id).current.style.display = 'flex';
  }

  const handleBlogControllerCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    controllerRefs.get(e.currentTarget.id).current.style.display = 'none';
  }

  const handleFilterSortNavClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    dispatch(toggleFilterSortBarActionCreator(true))
  }

  const handleFilterSortNavCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    dispatch(toggleFilterSortBarActionCreator(false))
  }

  const handleDeleteBlogClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    sendDeleteRequest({
      path: '/users/' + userId + '/blogs',
      method: RequestMethodEnum.DELETE,
    })
      .then((data: BlogListResponseDataType) => {
        // operation after successful delete request
      })
  }

  const handleRefreshClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = async (e) => {
    debug("start handling refresh click")
    const nextRefreshCount = currentRefreshCount + 1
    setRefreshCount(nextRefreshCount)
  }

  const handleFetchCancelClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
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
      const divRef: React.MutableRefObject<HTMLDivElement> = {
        current: null
      }
      controllerRefs.set(blog.id, divRef)
      return (
        <div className="blog-management-item-wrapper" key={blog.id} role='blog-item' >
          <img src="" alt="blog item" className="blog-management-item-img" />
          <h3 className="blog-management-item-title">{blog.title}</h3>
          <div className="blog-management-item-created-date">{blog.createdDate.toLocaleDateString("en-US", dateFormatOption)}</div>
          <div className="blog-management-btn-wrapper">
            <button className="blog-management-item-controller" onClick={handleBlogControllerOpenClickEvent} id={blog.id}>&hellip;</button>
          </div>
          <div className="blog-management-item-controller-wrapper" ref={divRef} id={blog.id}>
            <Link to={`./update/${blog.id}`} className="blog-management-blog-edit-link" role='blog-edit-link'>
              <button className="blog-management-item-edit-btn">Edit</button>
            </Link>
            <button role='blog-delete-btn' className="blog-management-item-delete-btn" onClick={handleDeleteBlogClickEvent}>Delete</button>
            <button className="blog-management-item-close-btn" onClick={handleBlogControllerCloseClickEvent} id={blog.id} >&#10005;</button>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="blog-management-wrapper">
      <div className="blog-management-main-wrapper">
        <h2 className="blog-management-title">Blog Management</h2>
        <div className="blog-management-controller-wrapper">
          <FetchStatus 
            currentFetchStatus={currentInitialBlogsFetchStatus} 
            setFetchStatus={setInitialBlogsFetchStatus} 
          />
          {(currentInitialBlogsFetchStatus.status !== ResponseResultStatusEnum.FETCHING &&
            <button className="blog-list-controller-refresh-btn" onClick={handleRefreshClickEvent}>refresh</button>)}
          {(currentInitialBlogsFetchStatus.status === ResponseResultStatusEnum.FETCHING 
            && <button className="blog-list-controller-cancel-btn" onClick={handleFetchCancelClickEvent}>cancel</button>)}
          <PageLimitSelect 
            currentPaginationStatus={currentPaginationStatus} 
            setPaginationStatus={setPaginationStatus} 
          />
          <FetchStatus 
            currentFetchStatus={currentInitialBlogsFetchStatus} 
            setFetchStatus={setInitialBlogsFetchStatus} 
            fetchingMsg={'deleting...'}
            successMsg={'ok'}
            failureMsg={'failed'}
          />
        </div>
        <div className="blog-management-items-wrapper">
          {(currentInitialBlogsFetchStatus.status === ResponseResultStatusEnum.FETCHING && 
            <p role="fetching">fetching ... </p>)}
          {(currentInitialBlogsFetchStatus.status !== ResponseResultStatusEnum.FETCHING && 
            currentBlogs.length === 0 && <p>blogs are empty</p>)}
          {(currentInitialBlogsFetchStatus.status !== ResponseResultStatusEnum.FETCHING && 
            currentBlogs.length !== 0 && renderBlogs(currentBlogs))}
        </div>
        <Pagination 
          currentPaginationStatus={currentPaginationStatus} 
          setPaginationStatus={setPaginationStatus} 
        />
      </div>
      <BlogFilterSort 
        currentFilters={currentFilters} 
        currentSort={currentSort} 
        setFilters={setFilters} 
        setSort={setSort} 
      />
    </div>
  );
}

export default BlogManagement;




