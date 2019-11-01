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
  const [currentRefreshStatus, setRefreshStatus] = React.useState(0)
  const [currentPaginationLimit, setPaginationLimit] = React.useState(20)
  const [currentPaginationOffset, setPaginationOffset] = React.useState(0)

  React.useEffect(() => {

    // api fetch for blog posts with limit/offset state
    // when only limit/offset or refresh status updated, this useEffect is called again besides when mounting
    console.log('calling mock api request')
    setBlogs(getBlogTestData(30))

    return () => {
    }
  }, [currentRefreshStatus, currentPaginationLimit, currentPaginationOffset])

  const handleRefreshClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    const nextStatus = currentRefreshStatus + 1
    setRefreshStatus(nextStatus)
  }

  const handlePageClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    const nextPageOffset: number = parseInt(e.currentTarget.value)
    setPaginationOffset(nextPageOffset)
  }

  const handlePageLimitChangeEvent: React.EventHandler<React.ChangeEvent<HTMLSelectElement>> = (e) => {
    const nextPageLimit: number = parseInt(e.currentTarget.value)
    setPaginationLimit(nextPageLimit)
  }

  return (
    <div className="blog-list-wrapper">
      <section className="blog-list-section-wrapper">
        <h2 className="blog-list-title">BlogLists</h2>
        <div className="blog-list-controller-wrapper">
          <button className="blog-list-controller-refresh-btn" onClick={handleRefreshClickEvent}>refresh</button>
          <select value={currentPaginationLimit} onChange={handlePageLimitChangeEvent}>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="blog-list-items-wrapper">
          {renderBlogLists(currentBlogs)}
        </div>
        <div className="blog-list-pagination-wrapper">
          <Pagination offset={ 0 } totalCount={ 1000 } limit={ 20 } onClick={handlePageClickEvent}/>
        </div>
      </section>
    </div>
  );
}

export default BlogList;




