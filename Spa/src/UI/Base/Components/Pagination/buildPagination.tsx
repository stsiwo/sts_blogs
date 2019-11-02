import range = require('lodash/range');
import { BuildPaginationResultType, PageType } from './types';

/**
 * helper hook for pagination 
 *
 **/
export const buildPagination: (offset: number, totalCount: number, limit: number) => BuildPaginationResultType = (offset, totalCount, limit) => {
  const pageNumList: number[] = generatePageNumList(totalCount, limit, offset);
  const pageList: PageType[] = pageNumList.map((pageNum) => {
    const currentPageNum = calculateCurrentPageNum(offset, limit);
    return {
      pageNum: pageNum,
      offset: calculateOffset(pageNum, limit),
      ...(currentPageNum === pageNum && { css: "pagination-btn pagination-btn-selected" }),
      ...(currentPageNum !== pageNum && { css: "pagination-btn" }),
    } as PageType;
  })
  const maxPageNum: number = calculateMaxPageNum(totalCount, limit);
  const maxPageNumOffset: number = calculateOffset(maxPageNum, limit);

  return {
    pageList: pageList,
    maxPageNum: maxPageNum,
    maxPageNumOffset: maxPageNumOffset
  }
}

const generatePageNumList: (totalCount: number, limit: number, offset: number) => number[] = (totalCount, limit, offset) => {

  const btnNum = 5;
  const leftBtnNum = 2;
  const rightBtnNum = 2;
  const currentPageNum = (offset !== 0) ? offset / limit : 1;
  const maxPageNum = calculateMaxPageNum(totalCount, limit);

  if (totalCount <= limit) return [];

  if (currentPageNum <= leftBtnNum + 1) {
    const upperPageNum = (maxPageNum - btnNum > 0) ? btnNum : maxPageNum;
    return range(1, upperPageNum + 1);
  }
  else if (maxPageNum - currentPageNum < rightBtnNum + 1) {
    return range(maxPageNum - (btnNum - 1), maxPageNum + 1);
  }
  else {
    const lowerPageNum = (currentPageNum - 2 < 0) ? 1 : currentPageNum - 2;
    const upperPageNum = (currentPageNum + 2 > maxPageNum) ? maxPageNum : (currentPageNum + 2);

    return range(lowerPageNum, upperPageNum + 1);
  }
}

const calculateOffset: (pageNum: number, limit: number) => number = (pageNum, limit) => {
  return (pageNum - 1) * limit;
}

const calculateMaxPageNum: (totalCount: number, limit: number) => number = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
}

const calculateCurrentPageNum: (offset: number, limit: number) => number = (offset, limit) => {
  return (offset !== 0) ? offset / limit : 1;
}
