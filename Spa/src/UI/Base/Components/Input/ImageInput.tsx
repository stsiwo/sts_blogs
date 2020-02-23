import * as React from 'react';
import './ImageInput.scss';
import { ImageInputPropType } from './types';
import BaseInput from './BaseInput';
import { MdClose } from 'react-icons/md';

const ImageInput: React.FunctionComponent<ImageInputPropType> = (props: ImageInputPropType) => {

  return (
    <div className={props.wrapperStyle}>
      <img src={props.src} className={props.imgStyle} onLoad={props.handleRevokeObjectURLOnLoad} />
      {(props.src &&
        <div className="icon-wrapper image-delete-icon-wrapper" onClick={props.handleImageRemoveClick} role="avatar-delete-icon">
          <MdClose className="icon" />
        </div>
      )}
      <div className={props.labelWrapperStyle}>
        <label htmlFor={props.id} className={props.labelStyle}>
          {props.label}
        </label>
        <input type="file" name={props.name} id={props.id} className={props.inputStyle} placeholder={props.placeholder} onChange={props.handleImageUploadChange} onFocus={props.onInputFocus} />
      </div>
    </div>
  );
}

export default ImageInput;










