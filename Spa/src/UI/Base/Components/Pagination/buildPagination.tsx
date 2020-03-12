import { BuildPaginationResultType, PageType } from './types';
import range from 'lodash/range';

/**
 * helper hook for pagination 
 *
 **/
export const buildPagination: (totalCount: number, limit: number, page: number) => BuildPaginationResultType = (totalCount, limit, page) => {
  const pageNumList: number[] = generatePageNumList(totalCount, limit, page);
  const pageList: PageType[] = pageNumList.map((pageNum) => {
    const currentPageNum = page 
    return {
      pageNum: pageNum,
      ...(currentPageNum === pageNum && { css: "pagination-btn pagination-btn-selected" }),
      ...(currentPageNum !== pageNum && { css: "pagination-btn" }),
    } as PageType;
  })
  const maxPageNum: number = calculateMaxPageNum(totalCount, limit);

  return {
    page: page,
    pageList: pageList,
    maxPageNum: maxPageNum,
  }
}

const generatePageNumList: (totalCount: number, limit: number, page: number) => number[] = (totalCount, limit, page) => {

  const btnNum = 5;
  const leftBtnNum = 2;
  const rightBtnNum = 2;
  const currentPageNum = page;
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

const calculateMaxPageNum: (totalCount: number, limit: number) => number = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
}

