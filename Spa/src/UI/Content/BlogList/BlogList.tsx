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
import PageLimitSelect from '../../Base/Components/Pagination/PageLimitSelect';
import RefreshBtn from '../../Base/Components/RefreshBtn/RefreshBtn';
import { useRefreshBtn } from '../../Base/Components/RefreshBtn/useRefreshBtn';
import { getBlogTestData } from '../../../../tests/data/BlogFaker';

declare type FetchResultType = {
  status: ResponseResultStatusEnum
  errorMsg?: string
}


const BlogList: React.FunctionComponent<{}> = (props: {}) => {

  const path = '/blogs'
  /** state **/
  const [currentBlogs, setBlogs] = React.useState([] as BlogType[])

  /** redux **/
  const isFilterSortBarOpen = useSelector((state: StateType) => state.ui.isFilterSortBarOpen)

  /** hooks **/
  const currentWidth = useResponsiveComponent()
  const cssGlobal = useCssGlobalContext()
  const dispatch = useDispatch()
  const { currentPaginationStatus, setPaginationStatus } = usePagination({})
  const { currentFilters, currentSort, setFilters, setSort } = useBlogFilterSort({})
  const { currentRefreshStatus, setRefreshStatus } = useRefreshBtn({})

  const callbackAfterApiFetch = (data: any): void => {
    // assign fetched blogs data to this state
    console.log('now callback of useApiFetch is called...')
    setBlogs(getBlogTestData())
    if (data) {
      console.log('response data is available')
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
    path: path,
    method: RequestMethodEnum.GET,
    queryString: queryString,
    callback: callbackAfterApiFetch,
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
        <Link to={`/blog/${blog.id}`} className="blog-list-items-item-wrapper" key={blog.id} role="blog-item">
          <h3 className="blog-list-items-item-title">{blog.title}</h3>
        </Link>
      )
    })
  }

  const renderTags = (tagList: TagType[]): React.ReactNode => {
    return tagList.map((tag: TagType) => <div className="blog-list-filter-tags-tag" key={tag.name}>{tag.name}</div>)
  }

  return (
    <div className="blog-list-wrapper">
      <section className="blog-list-section-wrapper">
        <h2 className="blog-list-title">BlogLists</h2>
        <div className="blog-list-controller-wrapper">
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
        <div className="blog-list-items-wrapper">
          {(currentFetchStatus.status === ResponseResultStatusEnum.FETCHING || currentRefreshStatus.status === ResponseResultStatusEnum.FETCHING && <p>fetching ... </p>)}
          {(currentFetchStatus.status !== ResponseResultStatusEnum.FETCHING && currentRefreshStatus.status !== ResponseResultStatusEnum.FETCHING && currentBlogs.length === 0 && <p>blogs are empty</p>)}
          {(currentFetchStatus.status !== ResponseResultStatusEnum.FETCHING && currentRefreshStatus.status !== ResponseResultStatusEnum.FETCHING && currentBlogs.length !== 0 && renderBlogLists(currentBlogs))}
        </div>
        <div className="blog-list-pagination-wrapper">
          <Pagination currentPaginationStatus={currentPaginationStatus} setPaginationStatus={setPaginationStatus} />
        </div>
      </section>
      <BlogFilterSort currentFilters={currentFilters} currentSort={currentSort} setFilters={setFilters} setSort={setSort} />
    </div>
  );
}

export default BlogList;




