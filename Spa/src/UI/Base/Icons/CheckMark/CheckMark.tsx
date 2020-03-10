import * as React from 'react';
import './CheckMark.scss';
import { CheckMarkPropType } from './types';
import { logger } from 'configs/logger';
import { FaCheck } from 'react-icons/fa';
const log = logger("CheckMark");


const CheckMark: React.FunctionComponent<CheckMarkPropType> = (props: CheckMarkPropType) => {
  log("Component start")


  return (
    <div className="checkmark-wrapper" role="checkmark-icon">
      <FaCheck className="checkmark"/>
    </div>
  );
}

export default CheckMark;








