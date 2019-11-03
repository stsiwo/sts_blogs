import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFilterSortBarActionCreator } from '../../../actions/creators';
import { BlogType } from '../../../domain/blog/BlogType';
import { TagType } from '../../../domain/tag/TagType';
import { RequestMethodEnum, ResponseResultStatusEnum } from '../../../requests/types';
import { StateType } from '../../../states/types';
import FetchStatus from '../../Base/Components/ApiFetch/FetchStatus';
import { useApiFetch } from '../../Base/Components/ApiFetch/useApiFetch';
import BlogFilterSort from '../../Base/Components/BlogFilterSort/BlogFilterSort';
import { useBlogFilterSort } from '../../Base/Components/BlogFilterSort/useBlogFilterSort';
import Pagination from '../../Base/Components/Pagination/Pagination';
import { usePagination } from '../../Base/Components/Pagination/usePagination';
import { useCssGlobalContext } from '../../Base/Context/CssGlobalContext/CssGlobalContext';
import { useResponsiveComponent } from '../../Base/Hooks/ResponsiveComponentHook';
import './BlogList.scss';

declare type FetchResultType = {
  status: ResponseResultStatusEnum
  errorMsg?: string
}


const BlogList: React.FunctionComponent<{}> = (props: {}) => {

  /** state **/
  const [currentBlogs, setBlogs] = React.useState([] as BlogType[])

  /** redux **/
  const isFilterSortBarOpen = useSelector((state: StateType) => state.ui.isFilterSortBarOpen)

  /** hooks **/
  const currentWidth = useResponsiveComponent()
  const cssGlobal = useCssGlobalContext()
  const dispatch = useDispatch()
  const { paginationStatus, setPaginationStatus, handlePageClickEvent, handlePageLimitChangeEvent } = usePagination({})
  const { filters, sort, setFilters, setSort } = useBlogFilterSort({})
  const { fetchStatus, handleFetchStatusCloseClickEvent, handleRefreshClickEvent } = useApiFetch<BlogType>({
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
    setDomainList: setBlogs,
    setPaginationStatus: setPaginationStatus,
  })

  /** EH **/
  const handleFilterSortNavClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    dispatch(toggleFilterSortBarActionCreator(true))
  }

  const handleFilterSortNavCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    dispatch(toggleFilterSortBarActionCreator(false))
  }

  /** render **/
  const renderBlogLists = (blogList: BlogType[]): React.ReactNode => {
    return blogList.map((blog: BlogType) => {
      return (
        <Link to={`/blog/${blog.id}`} className="blog-list-items-item-wrapper" key={blog.id}>
          <h3 className="">{blog.title}</h3>
        </Link>
      )
    })
  }

  const renderTags = (tagList: TagType[]): React.ReactNode => {
    return tagList.map((tag: TagType) => <div className="blog-list-filter-tags-tag" key={tag.id}>{tag.name}</div>)
  }

  return (
    <div className="blog-list-wrapper">
      <section className="blog-list-section-wrapper">
        <h2 className="blog-list-title">BlogLists</h2>
        <div className="blog-list-controller-wrapper">
          <FetchStatus fetchStatus={fetchStatus} onCloseClick={handleFetchStatusCloseClickEvent} />
          <button className="blog-list-controller-refresh-btn" onClick={handleRefreshClickEvent}>refresh</button>
          <select value={paginationStatus.limit} onChange={handlePageLimitChangeEvent}>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="blog-list-items-wrapper">
          {(currentBlogs.length === 0 && <p>blogs are empty</p>)}
          {(currentBlogs.length !== 0 && renderBlogLists(currentBlogs))}
        </div>
        <div className="blog-list-pagination-wrapper">
          <Pagination offset={ paginationStatus.offset } totalCount={ paginationStatus.totalCount } limit={ paginationStatus.limit } onClick={handlePageClickEvent}/>
        </div>
      </section>
      <BlogFilterSort filters={filters} sort={sort} setFilters={setFilters} setSort={setSort}/>
    </div>
  );
}

export default BlogList;




