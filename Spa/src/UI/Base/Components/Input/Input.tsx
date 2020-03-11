import * as React from 'react';
import './Input.scss';
import { InputPropType } from './types';
import BaseInput from './BaseInput';
import { ResponseResultStatusEnum } from 'requests/types';
import Loading from 'ui/Base/Icons/Loading/Loading';
import CheckMark from 'ui/Base/Icons/CheckMark/CheckMark';

const Input: React.FunctionComponent<InputPropType> = (props: InputPropType) => {

  const inputType = props.inputType ? props.inputType : 'text'

  return (
    <BaseInput 
      id={props.id}
      label={props.label}
      labelStyle={props.labelStyle}
      wrapperStyle={props.wrapperStyle}
      errorMsg={props.errorMsg}
      errorStyle={props.errorStyle}
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
      {(props.typeAhead && props.typeAheadStatus.status === ResponseResultStatusEnum.FETCHING &&
        <Loading />
      )}
      {(props.typeAhead && props.typeAheadStatus.status === ResponseResultStatusEnum.SUCCESS &&
        <CheckMark />
      )}
    </BaseInput>
  );
}

export default Input;









