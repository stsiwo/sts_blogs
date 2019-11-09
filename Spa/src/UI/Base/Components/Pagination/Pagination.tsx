import * as React from 'react';
import './Pagination.scss';
import { PaginationPropType, BuildPaginationResultType, PageType } from './types';
import { buildPagination } from './buildPagination';

const Pagination: React.FunctionComponent<PaginationPropType> = (props: PaginationPropType) => {

  const pageResult: BuildPaginationResultType = buildPagination(props.currentPaginationStatus.offset, props.currentPaginationStatus.totalCount, props.currentPaginationStatus.limit) 
  /** REFACTOR **/
  // setter should be done here (not inside api fetch component)
  const handlePageClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    console.log('start new page click event')
    props.currentPaginationStatus.offset = parseInt(e.currentTarget.value)
    props.setPaginationStatus({
      ...props.currentPaginationStatus
    })
  }


  if (pageResult.pageList.length !== 0) {
    return (
      <React.Fragment>
        <button className='pagination-btn' role='first-page-btn' value="0" onClick={handlePageClickEvent}>&laquo;</button>
        {(pageResult.pageList.map((page: PageType) => {
          return (
            <button className={page.css} value={page.offset} key={page.pageNum} onClick={handlePageClickEvent}>{page.pageNum}</button>
          );
        }))}
        <button className='pagination-btn' value={pageResult.maxPageNumOffset} onClick={handlePageClickEvent}>&raquo;</button>
      </React.Fragment>
    );
  } else {
    return null;
  }
}

export default Pagination;








