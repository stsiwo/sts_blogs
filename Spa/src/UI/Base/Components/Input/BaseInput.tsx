import * as React from 'react';
import './BaseInput.scss';
import { BaseInputPropType } from './types';

const BaseInput: React.FunctionComponent<BaseInputPropType> = (props: BaseInputPropType) => {

  return (
    <div className={props.wrapperStyle}>
      <label htmlFor={props.id} className={props.labelStyle}>
        {props.label}
      </label>
      {props.children}
    </div>
  );
}

export default BaseInput;










