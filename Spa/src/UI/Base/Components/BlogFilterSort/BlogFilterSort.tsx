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
import { useAuthContext } from '../../Context/AuthContext/AuthContext';

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
      props.currentFilters.tags.push({ name: e.currentTarget.value })
      props.setFilters({
        ...props.currentFilters,
      })
      e.currentTarget.value = ""
    }
  }

  const handleFilterCreationDateStartChangeEvent = (startDate: Date): void => {
    props.currentFilters.creationDate.start = startDate
    props.setFilters(props.currentFilters)
  }

  const handleFilterCreationDateEndChangeEvent = (endDate: Date): void => {
    props.currentFilters.creationDate.end = endDate
    props.setFilters(props.currentFilters)
  }

  const handleSortChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    props.setSort(parseInt(e.currentTarget.value))
  }

  const handleKeywordChangeEvent: React.EventHandler<React.KeyboardEvent<HTMLInputElement>> = (e) => {
    if (e.currentTarget.value === "") return false

    if (e.key == 'Enter' || e.key == 'Tab') {
      props.currentFilters.keyword = e.currentTarget.value
      props.setFilters(props.currentFilters)
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
    return props.currentFilters.tags.map((tag: TagType) => {
      return (
        <Tag name={tag.name} withCancelBtn key={tag.name}/>
      )
    })
  }

  const renderSortList = () => {
    return sortList.map((sort: SortType) => {
      return (
        <div className="aside-sort-item-wrapper" key={sort.value}>
          <input type='radio' className="" value={sort.value} key={sort.value} checked={sort.value === props.currentSort} onChange={handleSortChangeEvent}/>
          <span>{sort.title}</span>
        </div>
      )
    })
  }

  if (currentWidth <= cssGlobal.tabletSize && !isFilterSortBarOpen) {
    return <Icon label="??" css="blog-management-sort-filter-icon" onClick={handleFilterSortNavClickEvent} />
  } 

  const { auth } = useAuthContext()
  const newLink = auth.authed ? url + '/new' : '/login'

  return (
    <aside className="aside-wrapper" ref={filterSortBarWrapperRef}>
      <ul className="aside-ul">
        <li className="aside-li">
          <Link to={`${url}new`} className="aside-new-blog-link">
            <h3 className="aside-new-blog-label">Create New Blog</h3>
          </Link>
          {(!auth.authed && <p>Member Only</p>)}
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
              selected={props.currentFilters.creationDate.start}
              onChange={handleFilterCreationDateStartChangeEvent}
              selectsStart
              startDate={props.currentFilters.creationDate.start}
              maxDate={props.currentFilters.creationDate.end}
            />
            <DatePicker
              selected={props.currentFilters.creationDate.end}
              onChange={handleFilterCreationDateEndChangeEvent}
              selectsEnd
              endDate={props.currentFilters.creationDate.end}
              minDate={props.currentFilters.creationDate.start}
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







