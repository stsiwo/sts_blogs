import * as React from 'react';
import './Tag.scss';
import { TagPropType } from './types';

const Tag: React.FunctionComponent<TagPropType> = (props: TagPropType) => {

  return (
    <div className="tags-item-wrapper" key={props.name} role='tag-icon'>
      <i className="tags-item-name">{props.name}</i>
      <button className="tags-item-cancel-btn">&#10006;</button>
    </div>
  );
}

export default Tag;







