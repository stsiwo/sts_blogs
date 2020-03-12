import * as React from 'react';
import './TagInput.scss';
import { TagInputPropType } from './types';
import Tag from 'Components/Tag/Tag';
import BaseInput from './BaseInput';
import cloneDeep from 'lodash/cloneDeep';
import { logger } from 'configs/logger';
const log = logger("TagInput")

const TagInput: React.FunctionComponent<TagInputPropType> = (props: TagInputPropType) => {

  const isTagsLimit: boolean = props.currentBlog.tags.size >= 5 
  log("tag limit: " + isTagsLimit)
  log("current tag size: " + props.currentBlog.tags.size)
  const tagInputRef = React.useRef(null)

  const handleTagDeleteClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {

    const targetTag = e.currentTarget.getAttribute('data-tag')

    const nextBlog = cloneDeep(props.currentBlog)
    nextBlog.tags.delete(targetTag)
    props.setBlog({
      ...nextBlog
    })
  }

  const handleTagInputEnterOrTabKeyClickEvent: React.EventHandler<React.KeyboardEvent<HTMLInputElement>> = (e) => {

    // remove any space around tag value
    const targetValue: string = e.currentTarget.value.replace(/\s/g, '');

    if (targetValue === "") return false

    if (e.key == 'Enter' || e.key == 'Tab' || e.key == ' ') {
      const nextBlog = cloneDeep(props.currentBlog)
      nextBlog.tags.add(targetValue)
      props.setBlog({
        ...nextBlog
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
    <>
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
      </BaseInput>
      <div className="aside-filter-tags-list-selected">
        {renderCurrentTags()}
      </div>
    </>
  );
}

export default TagInput;










