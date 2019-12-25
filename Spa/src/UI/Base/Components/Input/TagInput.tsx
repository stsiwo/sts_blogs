import * as React from 'react';
import './TagInput.scss';
import { TagInputPropType } from './types';
import Tag from 'Components/Tag/Tag';
import BaseInput from './BaseInput';

const TagInput: React.FunctionComponent<TagInputPropType> = (props: TagInputPropType) => {

  const isTagsLimit: boolean = props.currentBlog.tags.size >= 10
  const tagInputRef = React.useRef(null)

  const handleTagDeleteClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {

    const targetTag = e.currentTarget.getAttribute('data-tag')

    props.currentBlog.tags.delete(targetTag)
    props.setBlog({
      ...props.currentBlog
    })
  }

  const handleTagInputEnterOrTabKeyClickEvent: React.EventHandler<React.KeyboardEvent<HTMLInputElement>> = (e) => {

    if (e.currentTarget.value === "") return false

    if (e.key == 'Enter' || e.key == 'Tab' || e.key == ' ') {
      props.currentBlog.tags.add(e.currentTarget.value)
      props.setBlog({
        ...props.currentBlog,
      })
      e.currentTarget.value = ""
      tagInputRef.current.focus()
    }
  }

  const renderCurrentTags = () => {
    return Array.from(props.currentBlog.tags).map((tag: string) => {
      return (
        <Tag
          name={tag}
          withCancelBtn
          key={tag}
          blackStyle
          handleTagDeleteClickEvent={handleTagDeleteClickEvent}
        />
      )
    })
  }

  return (
    <BaseInput
      id={props.id}
      label={props.label}
      labelStyle={props.labelStyle}
      wrapperStyle={props.wrapperStyle}
    >
      {(!isTagsLimit &&
        <input 
          type="text" 
          id={props.id} 
          name='tag-entry' 
          className={props.inputStyle}
          onKeyDown={handleTagInputEnterOrTabKeyClickEvent} 
          ref={tagInputRef} 
          placeholder="enter #tags here ..." 
        />
      )}
      {(isTagsLimit &&
        <input 
          type="text" 
          id='tag-entry' 
          name='tag-entry' 
          className="black-input grid-input blog-detail-input" 
          onKeyDown={handleTagInputEnterOrTabKeyClickEvent} 
          ref={tagInputRef} 
          placeholder="opps you reached max tags limit ..." 
          readOnly 
        />
      )}
      <div className="aside-filter-tags-list-selected">
        {renderCurrentTags()}
      </div>
    </BaseInput>
  );
}

export default TagInput;










