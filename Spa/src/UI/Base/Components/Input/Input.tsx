import * as React from 'react';
import './Input.scss';
import { InputPropType } from './types';
import BaseInput from './BaseInput';

const Input: React.FunctionComponent<InputPropType> = (props: InputPropType) => {

  const inputType = props.inputType ? props.inputType : 'text'

  return (
    <BaseInput 
      id={props.id}
      label={props.label}
      labelStyle={props.labelStyle}
      wrapperStyle={props.wrapperStyle}
    >
      <input 
        type={inputType} 
        name={props.name} 
        id={props.id} 
        className={props.inputStyle} 
        placeholder={props.placeholder} 
        value={props.inputValue} 
        onChange={props.onInputChange} 
        onFocus={props.onInputFocus} 
        ref={props.forwardRef}
      />
      {(props.errorMsg && 
         <div className={`input-error ${props.errorStyle}`} role="input-field-error-msg">{props.errorMsg}</div>
      )}
    </BaseInput>
  );
}

export default Input;









