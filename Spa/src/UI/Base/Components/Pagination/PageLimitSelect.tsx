import * as React from 'react';
import './PageLimitSelect.scss';
import { PageLimitSelectPropType } from './types';

const PageLimitSelect: React.FunctionComponent<PageLimitSelectPropType> = (props: PageLimitSelectPropType) => {

  const handlePageLimitChangeEvent: React.EventHandler<React.ChangeEvent<HTMLSelectElement>> = (e) => {
    props.currentPaginationStatus.limit = parseInt(e.currentTarget.value)
    props.setPaginationStatus({
      ...props.currentPaginationStatus
    })
  }

  return (
    <select value={props.currentPaginationStatus.limit} onChange={handlePageLimitChangeEvent}>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
      <option value="50">50</option>
    </select>
  );
}

export default PageLimitSelect;









