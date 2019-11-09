import * as React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { toggleFilterSortBarActionCreator } from '../../../../actions/creators';
import { BlogType } from '../../../../domain/blog/BlogType';
import { RequestMethodEnum, ResponseResultStatusEnum, BlogListResponseDataType } from '../../../../requests/types';
import { StateType } from '../../../../states/types';
import { dateFormatOption } from '../../../../utils';
import FetchStatus from '../../../Base/Components/ApiFetch/FetchStatus';
import { useApiFetch } from '../../../Base/Components/ApiFetch/useApiFetch';
import BlogFilterSort from '../../../Base/Components/BlogFilterSort/BlogFilterSort';
import { useBlogFilterSort } from '../../../Base/Components/BlogFilterSort/useBlogFilterSort';
import Pagination from '../../../Base/Components/Pagination/Pagination';
import { usePagination } from '../../../Base/Components/Pagination/usePagination';
import { useCssGlobalContext } from '../../../Base/Context/CssGlobalContext/CssGlobalContext';
import { useResponsiveComponent } from '../../../Base/Hooks/ResponsiveComponentHook';
import './BlogManagement.scss';
import PageLimitSelect from '../../../Base/Components/Pagination/PageLimitSelect';
import { TagType } from '../../../../domain/tag/TagType';
import { useRefreshBtn } from '../../../Base/Components/RefreshBtn/useRefreshBtn';
import RefreshBtn from '../../../Base/Components/RefreshBtn/RefreshBtn';
import { getBlogTestData } from '../../../../../tests/data/BlogFaker';
import { useAuthContext } from '../../../Base/Context/AuthContext/AuthContext';
import { useRequest } from '../../../Base/Hooks/useRequest';

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
  const { currentRefreshStatus, setRefreshStatus } = useRefreshBtn({})
  const { currentRequestStatus, setRequestStatus, fetchData } = useRequest({
    path: '/users/' + userId + '/blogs',
    method: RequestMethodEnum.DELETE,
    callback: (data: BlogListResponseDataType): void => {
      // operation after successful delete request
    }
  })
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
  const { currentFetchStatus, setFetchStatus } = useApiFetch({
    path: '/users/' + userId + '/blogs',
    method: RequestMethodEnum.GET,
    queryString: queryString,
    callback: callbackAfterApiFetch
  })

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
    fetchData()
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
          <FetchStatus currentFetchStatus={currentFetchStatus} setFetchStatus={setFetchStatus} />
          <RefreshBtn
            currentRefreshStatus={currentRefreshStatus}
            setRefreshStatus={setRefreshStatus}
            path={path}
            method={RequestMethodEnum.GET}
            queryString={queryString}
            callback={callbackAfterApiFetch}
            enableCancel
          />
          <PageLimitSelect currentPaginationStatus={currentPaginationStatus} setPaginationStatus={setPaginationStatus} />
        </div>
        <div className="blog-management-items-wrapper">
          {(currentFetchStatus.status === ResponseResultStatusEnum.FETCHING || currentRefreshStatus.status === ResponseResultStatusEnum.FETCHING && <p role="fetching">fetching ... </p>)}
          {(currentFetchStatus.status !== ResponseResultStatusEnum.FETCHING && currentRefreshStatus.status !== ResponseResultStatusEnum.FETCHING && currentBlogs.length === 0 && <p>blogs are empty</p>)}
          {(currentFetchStatus.status !== ResponseResultStatusEnum.FETCHING && currentRefreshStatus.status !== ResponseResultStatusEnum.FETCHING && currentBlogs.length !== 0 && renderBlogs(currentBlogs))}
        </div>
        <Pagination currentPaginationStatus={currentPaginationStatus} setPaginationStatus={setPaginationStatus} />
      </div>
      <BlogFilterSort currentFilters={currentFilters} currentSort={currentSort} setFilters={setFilters} setSort={setSort} />
    </div>
  );
}

export default BlogManagement;




