import * as React from 'react';
import './PageLimitSelect.scss';
import { PageLimitSelectPropType } from './types';

const PageLimitSelect: React.FunctionComponent<PageLimitSelectPropType> = (props: PageLimitSelectPropType) => {

  const handlePageLimitChangeEvent: React.EventHandler<React.ChangeEvent<HTMLSelectElement>> = (e) => {
    console.log('select option change event handler')
    console.log(e.currentTarget.value)
    props.currentPaginationStatus.limit = parseInt(e.currentTarget.value)
    props.setPaginationStatus({
      ...props.currentPaginationStatus
    })
  }

  return (
    <select className="page-limit-select" name='page-limit-select' role="page-limit-select" value={props.currentPaginationStatus.limit} onChange={handlePageLimitChangeEvent}>
      <option className="page-limit-option" value="20">20</option>
      <option className="page-limit-option" value="30">30</option>
      <option className="page-limit-option" value="40">40</option>
      <option className="page-limit-option" value="50">50</option>
    </select>
  );
}

export default PageLimitSelect;









