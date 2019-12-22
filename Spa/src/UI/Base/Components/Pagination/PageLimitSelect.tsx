import * as React from 'react';
import './PageLimitSelect.scss';
import { PageLimitSelectPropType } from './types';
import { MdViewModule } from 'react-icons/md';
var debug = require('debug')('ui:PageLimitSelect')


const PageLimitSelect: React.FunctionComponent<PageLimitSelectPropType> = (props: PageLimitSelectPropType) => {

  const handlePageLimitChangeEvent: React.EventHandler<React.ChangeEvent<HTMLSelectElement>> = (e) => {
    debug('select option change event handler')
    debug(e.currentTarget.value)
    props.currentPaginationStatus.limit = parseInt(e.currentTarget.value)
    props.currentPaginationStatus.page = 1 
    props.setPaginationStatus({
      ...props.currentPaginationStatus
    })
  }

  return (
    <div className="page-limit-select-wrapper" >
      <div className="icon-wrapper">
        <MdViewModule className="icon" />
      </div>
      <select className="page-limit-select" name='page-limit-select' role="page-limit-select" value={props.currentPaginationStatus.limit} onChange={handlePageLimitChangeEvent}>
        <option className="page-limit-option" value="20">20</option>
        <option className="page-limit-option" value="30">30</option>
        <option className="page-limit-option" value="40">40</option>
        <option className="page-limit-option" value="50">50</option>
      </select>
    </div>
  );
}

export default PageLimitSelect;









