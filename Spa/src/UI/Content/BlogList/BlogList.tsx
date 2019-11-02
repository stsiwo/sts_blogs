import * as React from 'react';
import './BlogList.scss';
import { TagType } from '../../../domain/tag/TagType';
import { getTagTestData } from '../../../../tests/data/TagFaker';
import { BlogType } from '../../../domain/blog/BlogType';
import { getBlogTestData } from '../../../../tests/data/BlogFaker';
import { useSelector, useDispatch } from 'react-redux';
import { StateType } from '../../../states/types';
import { useResponsiveComponent } from '../../Base/Hooks/ResponsiveComponentHook';
import { useCssGlobalContext } from '../../Base/Context/CssGlobalContext/CssGlobalContext';
import { toggleFilterSortBarActionCreator } from '../../../actions/creators';
import { Link } from 'react-router-dom';
import Pagination from '../../Base/Components/Pagination/Pagination';
import { RequestMethodEnum, ResponseResultType, ResponseResultStatusEnum } from '../../../requests/types';
import { request } from '../../../requests/request';
import FetchStatus from '../../Base/Components/ApiFetch/FetchStatus';
import { useApiFetch } from '../../Base/Components/ApiFetch/useApiFetch';
import { usePagination } from '../../Base/Components/Pagination/usePagination';

declare type FetchResultType = {
  status: ResponseResultStatusEnum
  errorMsg?: string
}


const BlogList: React.FunctionComponent<{}> = (props: {}) => {

  const isFilterSortBarOpen = useSelector((state: StateType) => state.ui.isFilterSortBarOpen)

  const renderTags = (tagList: TagType[]): React.ReactNode => {
    return tagList.map((tag: TagType) => <div className="blog-list-filter-tags-tag" key={tag.id}>{tag.name}</div>)
  }

  const currentWidth = useResponsiveComponent()
  const cssGlobal = useCssGlobalContext()

  const dispatch = useDispatch()

  const handleFilterSortNavClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    dispatch(toggleFilterSortBarActionCreator(true))
  }

  const handleFilterSortNavCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    dispatch(toggleFilterSortBarActionCreator(false))
  }

  const renderBlogLists = (blogList: BlogType[]): React.ReactNode => {
    return blogList.map((blog: BlogType) => {
      return (
        <Link to={`/blog/${blog.id}`} className="blog-list-items-item-wrapper" key={blog.id}>
          <h3 className="">{blog.title}</h3>
        </Link>
      )
    })
  }

  const [currentBlogs, setBlogs] = React.useState([] as BlogType[])

  const { paginationStatus, setPaginationStatus, handlePageClickEvent, handlePageLimitChangeEvent } = usePagination({})

  const { fetchStatus, handleFetchStatusCloseClickEvent, handleRefreshClickEvent } = useApiFetch<BlogType>({
    path: '/blogs',
    method: RequestMethodEnum.GET,
    queryString: {
      offset: paginationStatus.offset,
      limit: paginationStatus.limit
    },
    setDomainList: setBlogs,
    setPaginationStatus: setPaginationStatus
  })

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
          <Pagination offset={ 0 } totalCount={ 1000 } limit={ 20 } onClick={handlePageClickEvent}/>
        </div>
      </section>
    </div>
  );
}

export default BlogList;




