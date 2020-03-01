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

  return (
    <div className="fetch-status-wrapper">
      {(props.currentFetchStatus.status === ResponseResultStatusEnum.FETCHING && <h3 className="fetch-status-title" role="fetching-status">{fetchingMsg}</h3>)}
      {(props.currentFetchStatus.status === ResponseResultStatusEnum.SUCCESS && <h3 className="fetch-status-title" role="fetch-success-status">{successMsg}</h3>)}
      {(props.currentFetchStatus.status === ResponseResultStatusEnum.FAILURE && <h3 className="fetch-status-title" role="fetch-failure-status">{failureMsg}</h3>)}
      {(props.currentFetchStatus.errorMsg && <p className="fetch-status-err-msg">{props.currentFetchStatus.errorMsg}</p>)}
    </div>
  );
}

export default FetchStatus;






