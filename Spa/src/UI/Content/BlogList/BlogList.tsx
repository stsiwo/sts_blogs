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

  React.useEffect(() => {

    // api fetch for blog posts 
    console.log('calling mock api request')
    setBlogs(getBlogTestData(30))

    return () => {
    }
  }, [currentRefreshStatus])

  const handleRefreshClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    const nextStatus = currentRefreshStatus + 1
    setRefreshStatus(nextStatus)
  }

  return (
    <div className="blog-list-wrapper">
      <section className="blog-list-section-wrapper">
        <h2 className="blog-list-title">BlogLists</h2>
        <div className="blog-list-controller-wrapper">
          <button className="blog-list-controller-refresh-btn" onClick={handleRefreshClickEvent}>refresh</button>
        </div>
        <div className="blog-list-items-wrapper">
          {renderBlogLists(currentBlogs)}
        </div>
        <div className="blog-list-pagination-wrapper">
          <button className="blog-list-pagination-btn blog-list-pagination-to-first-btn" value='1'>&laquo;</button>
          <button className="blog-list-pagination-btn" value='1'>1</button>
          <button className="blog-list-pagination-btn" value='2'>2</button>
          <button className="blog-list-pagination-btn" value='3'>3</button>
          <button className="blog-list-pagination-btn" value='4'>4</button>
          <button className="blog-list-pagination-btn" value='5'>5</button>
          <button className="blog-list-pagination-btn blog-list-pagination-to-last-btn" value='last'>&raquo;</button>
        </div>
      </section>
    </div>
  );
}

export default BlogList;




