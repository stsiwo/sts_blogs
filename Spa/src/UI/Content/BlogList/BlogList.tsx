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
        <div className="blog-list-items-item-wrapper" key={blog.id}></div>
      )
    })
  }

  return (
    <div className="blog-list-wrapper">
      {(currentWidth > cssGlobal.tabletSize || (isFilterSortBarOpen && currentWidth <= cssGlobal.tabletSize)) &&
        <aside className="blog-list-aside-wrapper">
        {currentWidth <= cssGlobal.tabletSize && 
          <div className="blog-list-filter-sort-close-icon-wrapper">
        <i className="blog-list-filter-sort-close-icon" onClick={handleFilterSortNavCloseClickEvent} >&#10006;</i>
          </div>
         }
          <div className="blog-list-filter-wrapper">
            <h3 className="blog-list-filter-title">Filter</h3>
            <div className="blog-list-filter-tags-wrapper">
              <h4 className="blog-list-filter-tags-title">Tags</h4>
              {renderTags(getTagTestData())}
            </div>
            <div className="blog-list-filter-date-wrapper">
              <h4 className="blog-list-filter-date-title">Date</h4>
            </div>
          </div>
          <div className="blog-list-sort-wrapper">
            <h3 className="blog-list-sort-title">Sort</h3>
            <div className="blog-list-filter-sort-item-wrapper">
              <input type="checkbox" className="blog-list-filter-sort-item-input" id="checkbox_id" value="value" />
              <label htmlFor="checkbox_id" className="blog-list-filter-sort-item-label">Text</label>
            </div>
            <div className="blog-list-filter-sort-item-wrapper">
              <input type="checkbox" className="blog-list-filter-sort-item-input" id="checkbox_id" value="value" />
              <label htmlFor="checkbox_id" className="blog-list-filter-sort-item-label">Text</label>
            </div>
            <div className="blog-list-filter-sort-item-wrapper">
              <input type="checkbox" className="blog-list-filter-sort-item-input" id="checkbox_id" value="value" />
              <label htmlFor="checkbox_id" className="blog-list-filter-sort-item-label">Text</label>
            </div>
          </div>
        </aside>
      }
      <section className="blog-list-section-wrapper">
        <h2 className="blog-list-title">BlogLists</h2>
        <div className="blog-list-items-wrapper">
          {renderBlogLists(getBlogTestData())}
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
      {currentWidth <= cssGlobal.tabletSize && <i className="blog-list-filter-sort-icon" onClick={handleFilterSortNavClickEvent} />}
    </div>
  );
}

export default BlogList;




