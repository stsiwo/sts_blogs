import * as React from 'react';
import './Pagination.scss';
import { PaginationPropType, BuildPaginationResultType, PageType } from './types';
import { buildPagination } from './buildPagination';

const Pagination: React.FunctionComponent<PaginationPropType> = (props: PaginationPropType) => {

  const pageResult: BuildPaginationResultType = buildPagination(props.offset, props.totalCount, props.limit) 

  if (pageResult.pageList.length !== 0) {
    return (
      <React.Fragment>
        <button className='pagination-btn' value="0" onClick={props.onClick}>&laquo;</button>
        {(pageResult.pageList.map((page: PageType) => {
          return (
            <button className={page.css} value={page.offset} key={page.pageNum} onClick={props.onClick}>{page.pageNum}</button>
          );
        }))}
        <button className='pagination-btn' value={pageResult.maxPageNumOffset} onClick={props.onClick}>&raquo;</button>
      </React.Fragment>
    );
  } else {
    return null;
  }
}

export default Pagination;








