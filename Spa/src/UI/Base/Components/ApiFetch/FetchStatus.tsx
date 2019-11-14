import * as React from 'react';
import './FetchStatus.scss';
import { FetchStatusPropType } from './types';
import { ResponseResultStatusEnum } from 'requests/types';
var debug = require('debug')('ui:FetchStatus')

const FetchStatus: React.FunctionComponent<FetchStatusPropType> = (props: FetchStatusPropType) => {
  debug('Component start')

  const fetchingMsg = (props.fetchingMsg) ? props.fetchingMsg : 'fetching'
  const successMsg = (props.successMsg) ? props.successMsg : 'success'
  const failureMsg = (props.failureMsg) ? props.failureMsg : 'failure'
  /** 
   * re-implement this
   * close btn should be close this <FetchStatus> component. not for modify any currentFetchStatus
   **/
  const handleFetchStatusCloseClickEvent: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    debug('start handle fetch status close click event')
    props.setFetchStatus({
      status: ResponseResultStatusEnum.INITIAL
    })
  }

  return (
    <div className="fetch-status-wrapper">
      {(props.currentFetchStatus.status === ResponseResultStatusEnum.FETCHING && <h3 className="fetch-status-title">{fetchingMsg}</h3>)}
      {(props.currentFetchStatus.status === ResponseResultStatusEnum.SUCCESS && <h3 className="fetch-status-title">{successMsg}</h3>)}
      {(props.currentFetchStatus.status === ResponseResultStatusEnum.FAILURE && <h3 className="fetch-status-title">{failureMsg}</h3>)}
      {(props.currentFetchStatus.errorMsg && <p>{props.currentFetchStatus.errorMsg}</p>)}
      <button className="fetch-status-close-btn" onClick={handleFetchStatusCloseClickEvent}>&#10006;</button>
    </div>
  );
}

export default FetchStatus;






