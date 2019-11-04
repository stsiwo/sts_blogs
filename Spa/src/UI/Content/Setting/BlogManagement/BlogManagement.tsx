import * as React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { toggleFilterSortBarActionCreator } from '../../../../actions/creators';
import { BlogType } from '../../../../domain/blog/BlogType';
import { RequestMethodEnum } from '../../../../requests/types';
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

const BlogManagement: React.FunctionComponent<{}> = (props: {}) => {


  /** refs **/
  const controllerRefs: Map<string, React.MutableRefObject<HTMLDivElement>> = new Map()

  /** state **/
  const [currentBlogs, setBlogs] = React.useState([] as BlogType[])

  /** redux **/
  const isFilterSortBarOpen = useSelector((state: StateType) => state.ui.isFilterSortBarOpen)

  /** hooks **/
  const dispatch = useDispatch()
  const currentWidth = useResponsiveComponent()
  const cssGlobal = useCssGlobalContext()
  const { path, url } = useRouteMatch();
  const { paginationStatus, setPaginationStatus, handlePageClickEvent, handlePageLimitChangeEvent } = usePagination({})
  const { filters, sort, setFilters, setSort } = useBlogFilterSort({})
  const { fetchStatus, handleFetchStatusCloseClickEvent, handleRefreshClickEvent } = useApiFetch({
    path: '/blogs',
    method: RequestMethodEnum.GET,
    queryString: {
      offset: paginationStatus.offset,
      limit: paginationStatus.limit,
      tags: Object.values(filters.tags),
      startDate: filters.creationDate.start ? filters.creationDate.start.toJSON(): null,
      endDate: filters.creationDate.end ? filters.creationDate.end.toJSON(): null,
      keyword: filters.keyword,
      sort: sort,
    },
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

  /** render **/
  const renderBlogs = (blogs: BlogType[]): React.ReactNode => {

    return blogs.map((blog: BlogType) => {
      const divRef = React.useRef(null)
      controllerRefs.set(blog.id, divRef)
      return (
        <div className="blog-management-item-wrapper" key={blog.id}>
          <img src="" alt="blog item" className="blog-management-item-img" />
          <h3 className="blog-management-item-title">{blog.title}</h3>
          <div className="blog-management-item-created-date">{blog.createdDate.toLocaleDateString("en-US", dateFormatOption)}</div>
          <div className="blog-management-btn-wrapper">
            <button className="blog-management-item-controller" onClick={handleBlogControllerOpenClickEvent} id={blog.id}>&hellip;</button>
          </div>
          <div className="blog-management-item-controller-wrapper" ref={divRef} id={blog.id}>

            <Link to={`${url}/${blog.id}`} className="blog-management-aside-new-blog-link">
              <button className="blog-management-item-edit-btn">Edit</button>
            </Link>
            <button className="blog-management-item-delete-btn">Delete</button>
            <button className="blog-management-item-close-btn" onClick={handleBlogControllerCloseClickEvent} id={blog.id}>&#10005;</button>
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
          <FetchStatus fetchStatus={fetchStatus} onCloseClick={handleFetchStatusCloseClickEvent} />
          <button className="blog-management-controller-refresh-btn" onClick={handleRefreshClickEvent}>refresh</button>
          <select value={paginationStatus.limit} onChange={handlePageLimitChangeEvent}>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="blog-management-items-wrapper">
          {renderBlogs(currentBlogs)}
        </div>
          <Pagination offset={ paginationStatus.offset } totalCount={ paginationStatus.totalCount } limit={ paginationStatus.limit } onClick={handlePageClickEvent}/>
      </div>
      <BlogFilterSort filters={filters} sort={sort} setFilters={setFilters} setSort={setSort}/>
    </div>
  );
}

export default BlogManagement;




