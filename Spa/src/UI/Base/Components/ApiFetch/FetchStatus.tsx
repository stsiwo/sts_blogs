import * as React from 'react';
import './FetchStatus.scss';
import { FetchStatusPropType } from './types';
import { ResponseResultStatusEnum } from '../../../../requests/types';

const FetchStatus: React.FunctionComponent<FetchStatusPropType> = (props: FetchStatusPropType) => {

  return (
    <div className="fetch-status-wrapper">
      {(props.fetchStatus.status === ResponseResultStatusEnum.FETCHING && <h3 className="fetch-status-title">fetching ...</h3>)}
      {(props.fetchStatus.status === ResponseResultStatusEnum.SUCCESS && <h3 className="fetch-status-title">fetching success</h3>)}
      {(props.fetchStatus.status === ResponseResultStatusEnum.FAILURE && <h3 className="fetch-status-title">fetching failed</h3>)}
      {(props.fetchStatus.errorMsg && <p>{props.fetchStatus.errorMsg}</p>)}
      <button className="fetch-status-close-btn" onClick={props.onCloseClick}>&#10006;</button>
    </div>
  );
}

export default FetchStatus;






