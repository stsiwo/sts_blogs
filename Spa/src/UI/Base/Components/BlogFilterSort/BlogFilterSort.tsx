import { toggleFilterSortBarActionCreator } from 'actions/creators';
import Tag from 'Components/Tag/Tag';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useCssGlobalContext } from 'Contexts/CssGlobalContext/CssGlobalContext';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { StateType } from 'states/types';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { useResponsive } from 'Hooks/Responsive/useResponsive';
import { SortType, BlogFilterSortPropType } from './types';
import { TagType } from 'domain/tag/TagType';
import './BlogFilterSort.scss'
import { MdClose } from 'react-icons/md';
var debug = require('debug')('ui:BlogFilterSort')

const BlogFilterSort: React.FunctionComponent<BlogFilterSortPropType> = (props: BlogFilterSortPropType) => {

  /** refs **/
  const tagInputRef = React.useRef(null)
  const filterSortBarWrapperRef = React.useRef(null)
  /** state **/

  /** hooks **/
  const dispatch = useDispatch()
  let { path, url } = useRouteMatch();
  const isFilterSortBarOpen = useSelector((state: StateType) => state.ui.isFilterSortBarOpen)
  const currentScreenSize = useResponsive()

  /** EH **/
  const handleTagInputEnterOrTabKeyClickEvent: React.EventHandler<React.KeyboardEvent<HTMLInputElement>> = (e) => {
    debug('start handling new tag input')
    debug(e.currentTarget.value)

    if (e.currentTarget.value === "") return false

    if (e.key == 'Enter' || e.key == 'Tab') {
      debug("updating tag filters")
      props.currentFilters.tags.push({ name: e.currentTarget.value })
      props.setFilters({
        ...props.currentFilters,
      })
      e.currentTarget.value = ""
    }
  }

  const handleFilterCreationDateStartChangeEvent = (startDate: Date): void => {
    props.currentFilters.creationDate.start = startDate
    props.setFilters({
      ...props.currentFilters
    })
  }

  const handleFilterCreationDateEndChangeEvent = (endDate: Date): void => {
    props.currentFilters.creationDate.end = endDate
    props.setFilters({
      ...props.currentFilters
    })
  }

  const handleSortChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    debug('handling sort change ...')
    debug(e.currentTarget.value)
    props.setSort(parseInt(e.currentTarget.value))
  }

  const handleKeywordChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    debug('handling keyword change ...')
    if (e.currentTarget.value === "") return false

    debug(e.currentTarget.value)

    props.currentFilters.keyword = e.currentTarget.value
    props.setFilters({
      ...props.currentFilters
    })
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

      debug('add event listener during this component is mounted')
      if (filterSortBarWrapperRef.current.contains(e.target)) {
        return false;
      }
      dispatch(toggleFilterSortBarActionCreator(false))
    }
    if (filterSortBarWrapperRef.current !== null) {
      window.addEventListener('mousedown', handleFilterSortNavCloseWhenOutsideClickEvent);
    }

    return () => {
      debug('remove event listener after this component is unmounted')
      window.removeEventListener('mousedown', handleFilterSortNavCloseWhenOutsideClickEvent);
    }
  })

  React.useEffect(() => {
    if (currentScreenSize.isLTELaptop && filterSortBarWrapperRef.current) {
      filterSortBarWrapperRef.current.style.height = isFilterSortBarOpen ? currentScreenSize.currentScreenHeight + 'px' : '0px'
    }
  })

  /** anything else **/
  const sortList: SortType[] = [
    {
      title: 'Date Asc',
      value: 0
    },
    {
      title: 'Title Asc',
      value: 2
    },
    {
      title: 'Clap Asc',
      value: 4
    },
    {
      title: 'Date Desc',
      value: 1
    },
    {
      title: 'Title Desc',
      value: 3
    },
    {
      title: 'Clap Desc',
      value: 5
    },
  ]


  /** render **/
  const renderCurrentTags = () => {
    return props.currentFilters.tags.map((tag: TagType) => {
      return (
        <Tag name={tag.name} withCancelBtn key={tag.name} />
      )
    })
  }

  const renderSortList = () => {
    return sortList.map((sort: SortType) => {
      return (
        <div className="aside-sort-item-wrapper" key={sort.value}>
          <label htmlFor={`sort-${sort.value}`} className="">
            <input type='radio' id={`sort-${sort.value}`} name='sort' className="aside-sort-item-input" value={sort.value} key={sort.value} checked={sort.value === props.currentSort} onChange={handleSortChangeEvent} />
            {sort.title}
          </label>
        </div>
      )
    })
  }

  const { auth } = useAuthContext()
  const newLink = auth.authed ? url + 'new' : '/login'

  return (
    <aside role="filter-sort-aside" className="filter-sort-aside-wrapper" ref={filterSortBarWrapperRef}>
      {(currentScreenSize.isLTETablet &&
        <div className="close-icon-row" onClick={handleFilterSortNavCloseClickEvent}>
          <div className="icon-wrapper" >
            <MdClose className="icon filter-sort-aside-content-close-icon" />
          </div>
        </div>
      )}
      <div className="filter-sort-aside-content">
        <h1 className="filter-sort-aside-title">Sort by</h1>
        <div className="filter-sort-aside-sort-grid">
          {renderSortList()}
        </div>
        <h1 className="filter-sort-aside-title">Filter by</h1>
        <div className="aside-filter-keyword-wrapper" >
          <label htmlFor="keyword" className="aside-filter-label">Keyword</label>&nbsp;
          <input type="text" name="keyword" id="keyword" className="white-input" onChange={handleKeywordChangeEvent} value={props.currentFilters.keyword} placeholder="enter keyword here ..." />
        </div>
        <div className="aside-filter-start-date-wrapper" >
          <label htmlFor="start-date-input" className="aside-filter-label">Start Date</label>&nbsp;
          <DatePicker
            selected={props.currentFilters.creationDate.start}
            onChange={handleFilterCreationDateStartChangeEvent}
            selectsStart
            startDate={props.currentFilters.creationDate.start}
            maxDate={props.currentFilters.creationDate.end}
            id='start-date-input'
            className="white-input"
            placeholderText="click to pick start date here ..."
          />
        </div>
        <div className="aside-filter-end-date-wrapper" >
          <label htmlFor="end-date-input" className="aside-filter-label">End Date</label>
          <DatePicker
            selected={props.currentFilters.creationDate.end}
            onChange={handleFilterCreationDateEndChangeEvent}
            selectsEnd
            endDate={props.currentFilters.creationDate.end}
            minDate={props.currentFilters.creationDate.start}
            id="end-date-input"
            className="white-input"
            placeholderText="click to pick end date here ..."
          />
        </div>
        <div className="aside-filter-tags-wrapper" >
          <label htmlFor="tag" className="aside-filter-label">Tags</label>
          <input type="text" id='tag' name='tag' className="white-input" onKeyDown={handleTagInputEnterOrTabKeyClickEvent} ref={tagInputRef} placeholder="enter #tags here ..."/>
          <div className="aside-filter-tags-list-selected">
            {renderCurrentTags()}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default BlogFilterSort;







