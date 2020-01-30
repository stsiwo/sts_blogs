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
import { BlogFilterSortPropType, FilterType } from './types';
import { sortList, SortType } from 'domain/blog/Sort';
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

    if (e.key == 'Enter' || e.key == 'Tab' || e.key == ' ') {
      debug("updating tag filters")
      props.currentFilters.tags.push({ name: e.currentTarget.value })
      props.setFilters({
        ...props.currentFilters,
      })
      e.currentTarget.value = ""
    }
  }

  const handleFilterCreationDateStartChangeEvent = (startDate: Date): void => {
    props.currentFilters.startDate = startDate
    props.setFilters({
      ...props.currentFilters
    })
  }

  const handleFilterCreationDateEndChangeEvent = (endDate: Date): void => {
    props.currentFilters.endDate = endDate
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

    debug(e.currentTarget.value)

    props.currentFilters.keyword = e.currentTarget.value
    props.setFilters({
      ...props.currentFilters
    })
  }

  const handleFilterDeleteIconClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    const targetFilterKey = e.currentTarget.getAttribute('data-filter-key')
    props.setFilters({
      ...props.currentFilters,
      [targetFilterKey]: ''
    })
  }

  const handleTagDeleteClickEvent: React.EventHandler<React.MouseEvent<HTMLElement>> = (e) => {
    const targetTag: string = e.currentTarget.getAttribute('data-tag')
    props.setFilters((prev: FilterType) => {
      prev.tags.splice(prev.tags.indexOf(targetTag as unknown as TagType), 1)
      console.log('inside tag delete')
      console.log(prev)
      return { ...prev }
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

  /** reach max tags limit: 10 tags **/
  const isTagsLimit: boolean = props.currentFilters.tags.length >= 10

  /** render **/
  const renderCurrentTags = () => {
    const wrapperStyle = currentScreenSize.isLTETablet ? "" : "aside-filter-tag-wrapper"
    const nameStyle = currentScreenSize.isLTETablet ? "" : "aside-filter-tag-name"
    debug("before render selected tags")
    debug(currentScreenSize.isLTELaptop) 
    debug(wrapperStyle) 
    return props.currentFilters.tags.map((tag: TagType) => {
      return (
        <Tag
          name={tag.name}
          withCancelBtn
          key={tag.name}
          wrapperStyle={wrapperStyle}
          nameStyle={nameStyle}
          handleTagDeleteClickEvent={handleTagDeleteClickEvent}
        />
      )
    })
  }

  const renderSortList = () => {
    return sortList.map((sort: SortType) => {
      const isSelected: boolean = sort.value === props.currentSort
      return (
        <div className={`aside-sort-item-wrapper ${isSelected ? 'aside-sort-item-selected-wrapper' : ''}`} key={sort.value}>
          <label htmlFor={`sort-${sort.value}`} className="">
            <input type='radio' id={`sort-${sort.value}`} name='sort' className="aside-sort-item-input" value={sort.value} key={sort.value} checked={isSelected} onChange={handleSortChangeEvent} />
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
          <div className="icon-wrapper" role="filter-sort-icon">
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
        <div className="aside-filter-input-wrapper" >
          <label htmlFor="keyword" className="aside-filter-label">Keyword</label>&nbsp;
          <input type="text" name="keyword" id="keyword" className="white-input aside-filter-input" onChange={handleKeywordChangeEvent} value={props.currentFilters.keyword} placeholder="enter keyword here ..." />
          <div className="small-icon-wrapper aside-filter-icon-wrapper" role="keyword-filter-delete-icon" onClick={handleFilterDeleteIconClickEvent} data-filter-key='keyword'>
            <MdClose className="small-icon" />
          </div>
        </div>
        <div className="aside-filter-input-wrapper" >
          <label htmlFor="start-date-input" className="aside-filter-label">Start Date</label>&nbsp;
          <DatePicker
            selected={props.currentFilters.startDate}
            onChange={handleFilterCreationDateStartChangeEvent}
            selectsStart
            startDate={props.currentFilters.startDate}
            maxDate={props.currentFilters.endDate}
            id='start-date-input'
            className="white-input aside-filter-input"
            placeholderText="click to pick start date here ..."
          />
          <div className="small-icon-wrapper aside-filter-icon-wrapper" role="start-date-filter-delete-icon" onClick={handleFilterDeleteIconClickEvent} data-filter-key='startDate'>
            <MdClose className="small-icon" />
          </div>
        </div>
        <div className="aside-filter-input-wrapper" >
          <label htmlFor="end-date-input" className="aside-filter-label">End Date</label>
          <DatePicker
            selected={props.currentFilters.endDate}
            onChange={handleFilterCreationDateEndChangeEvent}
            selectsEnd
            endDate={props.currentFilters.endDate}
            minDate={props.currentFilters.startDate}
            id="end-date-input"
            className="white-input aside-filter-input"
            placeholderText="click to pick end date here ..."
          />
          <div className="small-icon-wrapper aside-filter-icon-wrapper" role="end-date-filter-delete-icon" onClick={handleFilterDeleteIconClickEvent} data-filter-key='endDate'>
            <MdClose className="small-icon" />
          </div>
        </div>
        <div className="aside-filter-input-wrapper" >
          <label htmlFor="tag" className="aside-filter-label">Tags</label>
          {(!isTagsLimit &&
            <input type="text" id='tag' name='tag' className="white-input aside-filter-input" onKeyDown={handleTagInputEnterOrTabKeyClickEvent} ref={tagInputRef} placeholder="enter #tags here ..." />
          )}
          {(isTagsLimit &&
            <input type="text" id='tag' name='tag' className="white-input aside-filter-input" onKeyDown={handleTagInputEnterOrTabKeyClickEvent} ref={tagInputRef} placeholder="opps you reached max tags limit ..." readOnly/>
          )}
        </div>
        <div className="aside-filter-tags-list-selected">
          {renderCurrentTags()}
        </div>
      </div>
    </aside>
  );
}

export default BlogFilterSort;







