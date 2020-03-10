import * as React from 'react';
import './Loading.scss';
import { LoadingPropType } from './types';
import { logger } from 'configs/logger';
const log = logger("Loading");


const Loading: React.FunctionComponent<LoadingPropType> = (props: LoadingPropType) => {
  log("Component start")


  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loading;







