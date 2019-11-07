import * as React from 'react';
import './RefreshBtn.scss';
import { RefreshBtnPropType } from './types';
import { ResponseResultStatusEnum } from '../../../../requests/types';
import { cancelRequest } from '../../../../requests/request';

const RefreshBtn: React.FunctionComponent<RefreshBtnPropType> = (props: RefreshBtnPropType) => {

  const handleRefreshClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    const nextStatus = props.currentRefreshStatus + 1
    props.setRefreshStatus(nextStatus)
  }

  const handleCancelClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    console.log('cancel button is clicked')
    props.cancelSource.cancel("refresh request is canceled")
  }

  if (props.currentFetchStatus.status !== ResponseResultStatusEnum.FETCHING) 
    return (<button className="blog-list-controller-refresh-btn" onClick={handleRefreshClickEvent}>refresh</button>)

  return (<button className="blog-list-controller-cancel-btn" onClick={handleCancelClickEvent}>cancel</button>)
}

export default RefreshBtn;







