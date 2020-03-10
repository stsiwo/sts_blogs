import * as React from 'react';
import './BaseInput.scss';
import { BaseInputPropType } from './types';

const BaseInput: React.FunctionComponent<BaseInputPropType> = (props: BaseInputPropType) => {

  return (
    <div className={props.wrapperStyle}>
      <div className="label-input-row">
        <label htmlFor={props.id} className={props.labelStyle}>
          {props.label}
        </label>
        {props.children}
      </div>
      {(props.errorMsg &&
        <div className={`input-error ${props.errorStyle}`} role="input-field-error-msg">{props.errorMsg}</div>
      )}
    </div>
  );
}

export default BaseInput;










