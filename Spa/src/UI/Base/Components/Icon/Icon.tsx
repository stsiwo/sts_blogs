import * as React from 'react';
import './Icon.scss';
import { IconPropType } from './types';

const Icon: React.FunctionComponent<IconPropType> = (props: IconPropType) => {

  return (
    <div className={`icon-round-wrapper ${props.css}`} onClick={props.onClick} role={props.role}>
      <i className="icon-item">{props.label}</i> 
    </div>
    );
  }
  
  export default Icon;
  
  
  
  
  

