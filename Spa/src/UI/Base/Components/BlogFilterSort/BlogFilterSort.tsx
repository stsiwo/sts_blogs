import * as React from 'react';
import './BlogFilterSort.scss';
import { BlogFilterSortPropType, FilterType, TagType, SortType } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilterSortBarActionCreator } from '../../../../actions/creators';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import Tag from '../../../Base/Components/Tag/Tag';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useResponsiveComponent } from '../../Hooks/ResponsiveComponentHook';
import { useCssGlobalContext } from '../../Context/CssGlobalContext/CssGlobalContext';
import Icon from '../Icon/Icon';
import { StateType } from '../../../../states/types';

const BlogFilterSort: React.FunctionComponent<BlogFilterSortPropType> = (props: BlogFilterSortPropType) => {

  /** refs **/
  const tagInputRef = React.useRef(null)
  const filterSortBarWrapperRef = React.useRef(null)

  /** state **/

  /** hooks **/
  const dispatch = useDispatch()
  let { path, url } = useRouteMatch();
  const currentWidth = useResponsiveComponent()
  const cssGlobal = useCssGlobalContext()
  const isFilterSortBarOpen = useSelector((state: StateType) => state.ui.isFilterSortBarOpen)

  /** EH **/
  const handleTagInputEnterOrTabKeyClickEvent: React.EventHandler<React.KeyboardEvent<HTMLInputElement>> = (e) => {

    if (e.currentTarget.value === "") return false

    if (e.key == 'Enter' || e.key == 'Tab') {
      console.log("updating tag filters")
      props.filters.tags.push({ name: e.currentTarget.value })
      props.setFilters({
        ...props.filters,
      })
      e.currentTarget.value = ""
    }
  }

  const handleFilterCreationDateStartChangeEvent = (startDate: Date): void => {
    props.filters.creationDate.start = startDate
    props.setFilters(props.filters)
  }

  const handleFilterCreationDateEndChangeEvent = (endDate: Date): void => {
    props.filters.creationDate.end = endDate
    props.setFilters(props.filters)
  }

  const handleSortChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    props.setSort(parseInt(e.currentTarget.value))
  }

  const handleKeywordChangeEvent: React.EventHandler<React.KeyboardEvent<HTMLInputElement>> = (e) => {
    if (e.currentTarget.value === "") return false

    if (e.key == 'Enter' || e.key == 'Tab') {
      props.filters.keyword = e.currentTarget.value
      props.setFilters(props.filters)
    }
  }

  const handleFilterSortNavClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    dispatch(toggleFilterSortBarActionCreator(true))
  }

  const handleFilterSortNavCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    dispatch(toggleFilterSortBarActionCreator(false))
  }


  /** lifecycle **/
  React.useEffect(() => {
    /** must enable componentdidupdate also, otherwise not close when click outside **/
    const handleFilterSortNavCloseWhenOutsideClickEvent = (e: Event) => {
      
      console.log('add event listener during this component is mounted')
      if (filterSortBarWrapperRef.current.contains(e.target)) {

        return false;
      }
      dispatch(toggleFilterSortBarActionCreator(false))
    }
    if (filterSortBarWrapperRef.current !== null) {
      window.addEventListener('mousedown', handleFilterSortNavCloseWhenOutsideClickEvent);
    }

    return () => {
      console.log('remove event listener after this component is unmounted')
      window.removeEventListener('mousedown', handleFilterSortNavCloseWhenOutsideClickEvent);
    }
  })

  /** anything else **/
  const sortList: SortType[] = [
    {
      title: 'Date Asc',
      value: 0
    },
    {
      title: 'Date Desc',
      value: 1
    },
    {
      title: 'Title Asc',
      value: 2
    },
    {
      title: 'Title Desc',
      value: 3
    },
    {
      title: 'Review Asc',
      value: 4
    },
    {
      title: 'Review Desc',
      value: 5
    },
  ]


  /** render **/
  const renderCurrentTags = () => {
    return props.filters.tags.map((tag: TagType) => {
      return (
        <Tag name={tag.name} withCancelBtn key={tag.name}/>
      )
    })
  }

  const renderSortList = () => {
    return sortList.map((sort: SortType) => {
      return (
        <div className="aside-sort-item-wrapper" key={sort.value}>
          <input type='radio' className="" value={sort.value} key={sort.value} checked={sort.value === props.sort} onChange={handleSortChangeEvent}/>
          <span>{sort.title}</span>
        </div>
      )
    })
  }

  if (currentWidth <= cssGlobal.tabletSize && !isFilterSortBarOpen) {
    return <Icon label="??" css="blog-management-sort-filter-icon" onClick={handleFilterSortNavClickEvent} />
  } 

  return (
    <aside className="aside-wrapper" ref={filterSortBarWrapperRef}>
      <ul className="aside-ul">
        <li className="aside-li">
          <Link to={`${url}/new`} className="aside-new-blog-link">
            <h3 className="aside-new-blog-label">Create New Blog</h3>
          </Link>
        </li>
        <li className="aside-li">
          <h3 className="aside-filter-title">Filter Blogs</h3>
          <div className="aside-filter-tags-wrapper" >
            <h4 className="aside-filter-tags-title">Tags</h4>
            <input type="text" className="aside-filter-tags-input" onKeyDown={handleTagInputEnterOrTabKeyClickEvent} ref={tagInputRef} />
            {renderCurrentTags()}
          </div>
          <div className="aside-filter-keyword-wrapper" >
            <h4 className="aside-filter-keyword-title">Keywords</h4>
            <input type="text" className="aside-filter-keyword-input" onKeyDown={handleKeywordChangeEvent}/>
          </div>
          <div className="aside-filter-date-wrapper" >
            <h4 className="aside-filter-date-title">Date</h4>
            <DatePicker
              selected={props.filters.creationDate.start}
              onChange={handleFilterCreationDateStartChangeEvent}
              selectsStart
              startDate={props.filters.creationDate.start}
              maxDate={props.filters.creationDate.end}
            />
            <DatePicker
              selected={props.filters.creationDate.end}
              onChange={handleFilterCreationDateEndChangeEvent}
              selectsEnd
              endDate={props.filters.creationDate.end}
              minDate={props.filters.creationDate.start}
            />
          </div>
        </li>
        <li className="aside-li">
          <h3 className="aside-sort-title">Sort Blogs</h3>
          <div className="aside-sort-items-wrapper" >
            {renderSortList()}
          </div>
        </li>
      </ul>
    {( currentWidth <= cssGlobal.tabletSize && <div className="aside-filter-sort-close-icon" onClick={handleFilterSortNavCloseClickEvent}>&#10005;</div>)}
    </aside>
  );
}

export default BlogFilterSort;







