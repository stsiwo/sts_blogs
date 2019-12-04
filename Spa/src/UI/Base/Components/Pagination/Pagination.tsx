import * as React from 'react';
import './Pagination.scss';
import { PaginationPropType, BuildPaginationResultType, PageType } from './types';
import { buildPagination } from './buildPagination';
import { MdLastPage, MdFirstPage } from 'react-icons/md';
var debug = require('debug')('ui:Pagination')

const Pagination: React.FunctionComponent<PaginationPropType> = (props: PaginationPropType) => {

  //const pageResult: BuildPaginationResultType = buildPagination(props.currentPaginationStatus.offset, props.currentPaginationStatus.totalCount, props.currentPaginationStatus.limit)
  // delete when it is done
  const pageResult: BuildPaginationResultType = buildPagination(1000, 40, 1)
  /** REFACTOR **/
  // setter should be done here (not inside api fetch component)
  const handlePageClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    debug('start new page click event')
    props.currentPaginationStatus.page = parseInt(e.currentTarget.value)
    props.setPaginationStatus({
      ...props.currentPaginationStatus
    })
  }


  return (pageResult.pageList.length !== 0 &&
    <div className="pagination-wrapper">
      <button className='pagination-btn' role='first-page-btn' value="1" onClick={handlePageClickEvent}>
        <MdFirstPage className="page-icon"/> 
      </button>
      {(pageResult.pageList.map((page: PageType) => {
        return (
          <button className={page.css} value={page.pageNum} key={page.pageNum} onClick={handlePageClickEvent}>{page.pageNum}</button>
        );
      }))}
      <button className='pagination-btn' role='last-page-btn' value={pageResult.maxPageNum} onClick={handlePageClickEvent}>
        <MdLastPage className="page-icon"/>
      </button>
    </div>
  );
}

export default Pagination;








