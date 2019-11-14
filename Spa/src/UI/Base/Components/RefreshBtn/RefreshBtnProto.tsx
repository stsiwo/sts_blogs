import { AxiosError, CancelTokenStatic, CancelTokenSource } from 'axios';
import * as React from 'react';
import { ResponseResultStatusEnum, ResponseResultType } from 'requests/types';
import { buildQueryString } from '../../../../utils';
import { RefreshBtnProtoPropType } from './types';
import { request, getCancelTokenSource } from 'requests/request';
import { api } from 'requests/api';
var debug = require('debug')('ui:RefreshBtnProto')

const RefreshBtnProto: React.FunctionComponent<RefreshBtnProtoPropType> = (props: RefreshBtnProtoPropType) => {

  /** 
   * this approach does not work because 'cancelSource' inside event handler cannot access to outter 'cancelSource' 
   *  - event handler's 'this' refers to event handler not outer function (funtional component)
   **/

  const handleRefreshClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = async (e) => {
    debug("start handling refresh click")
    const nextRefreshCount = props.currentRefreshCount + 1
    debug("next refresh count" + nextRefreshCount)
    props.setRefreshCount(nextRefreshCount)
  }

  const handleCancelClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    debug('handle cancel click')
    debug(props.currentCancelSource)
    props.currentCancelSource.cancel("refresh request is canceled")
  }

  const handleFetchStatusCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
  }

  return (
    <>
    {(props.currentFetchStatus.status !== ResponseResultStatusEnum.FETCHING && <button className="blog-list-controller-refresh-btn" onClick={handleRefreshClickEvent}>refresh</button>)}
    {(props.currentFetchStatus.status === ResponseResultStatusEnum.FETCHING && <button className="blog-list-controller-cancel-btn" onClick={handleCancelClickEvent}>cancel</button>)}
    </>

  )
}

export default RefreshBtnProto;







