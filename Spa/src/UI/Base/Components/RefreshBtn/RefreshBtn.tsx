import { AxiosError, CancelTokenStatic, CancelTokenSource } from 'axios';
import * as React from 'react';
import { ResponseResultStatusEnum, ResponseResultType } from '../../../../requests/types';
import { buildQueryString } from '../../../../utils';
import './RefreshBtn.scss';
import { RefreshBtnPropType } from './types';
import { request, getCancelTokenSource } from '../../../../requests/request';
import { api } from '../../../../requests/api';
var debug = require('debug')('ui:RefreshBtn')

const RefreshBtn: React.FunctionComponent<RefreshBtnPropType> = (props: RefreshBtnPropType) => {

  /** 
   * this approach does not work because 'cancelSource' inside event handler cannot access to outter 'cancelSource' 
   *  - event handler's 'this' refers to event handler not outer function (funtional component)
   **/

  const [currentCancelSource, setCancelSource] = React.useState<CancelTokenSource>(null)

  const encodedQueryString = buildQueryString(props.queryString)

  const handleRefreshClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = async (e) => {
    debug('handle refresh click')

    debug('set cancel source to state')
    const cancelSource: CancelTokenSource = getCancelTokenSource() 
    setCancelSource(cancelSource)

    props.setRefreshStatus({
      status: ResponseResultStatusEnum.FETCHING,
    })
    await request({
      url: props.path + encodedQueryString,
      ...(props.method && { method: props.method }),
      cancelToken: cancelSource.token
    })
      .then((responseResult: ResponseResultType) => {
        /** this include 'catch' clause of 'requests' method **/
        props.setRefreshStatus({
          status: responseResult.status,
          data: responseResult.data,
          errorMsg: responseResult.errorMsg
        })
        /**
         * any callback when response is secceeded 
         * e.g., assign domain data
         * e.g., assign new total count of pagination
         **/
        props.callback(responseResult.data)
      })
      .catch((error: AxiosError) => {
        /** this is called when above 'then' caluse failed **/
        /** esp, 'props.callback' internal error **/
        props.setRefreshStatus({
          status: ResponseResultStatusEnum.FAILURE,
          errorMsg: error.message
        })
      })
  }

  const handleCancelClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    debug('handle cancel click')
    debug(currentCancelSource)
    currentCancelSource.cancel("refresh request is canceled")
  }

  const handleFetchStatusCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
  }

  return (
    <>
    {(props.currentRefreshStatus.status !== ResponseResultStatusEnum.FETCHING && <button className="blog-list-controller-refresh-btn" onClick={handleRefreshClickEvent}>refresh</button>)}
    {(props.currentRefreshStatus.status === ResponseResultStatusEnum.FETCHING && <button className="blog-list-controller-cancel-btn" onClick={handleCancelClickEvent}>cancel</button>)}
      <div className="fetch-status-wrapper">
        {(props.currentRefreshStatus.status === ResponseResultStatusEnum.FETCHING && <h3 className="fetch-status-title">fetching ...</h3>)}
        {(props.currentRefreshStatus.status === ResponseResultStatusEnum.SUCCESS && <h3 className="fetch-status-title">fetching success</h3>)}
        {(props.currentRefreshStatus.status === ResponseResultStatusEnum.FAILURE && <h3 className="fetch-status-title">fetching failed</h3>)}
        {(props.currentRefreshStatus.errorMsg && <p>{props.currentRefreshStatus.errorMsg}</p>)}
        <button className="fetch-status-close-btn" onClick={handleFetchStatusCloseClickEvent}>&#10006;</button>
      </div>
    </>

  )
}

export default RefreshBtn;







