import { BlogType, initialBlogState } from 'domain/blog/BlogType';
import { TagType } from 'domain/tag/TagType';
import * as React from 'react';
import { useParams } from 'react-router';
import { BlogResponseDataType, RequestMethodEnum, ResponseResultStatusEnum } from 'requests/types';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { useRequest } from 'Hooks/Request/useRequest';
import { useBlogValidation } from 'Hooks/Validation/Blog/useBlogValidation';
import './UpdateBlog.scss';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
import Tag from 'Components/Tag/Tag';
var debug = require('debug')('ui:UpdateBlog')

const UpdateBlog: React.FunctionComponent<{}> = (props: {}) => {

  const tagInputRef = React.useRef(null)
  const titleInputRef = React.useRef(null)
  const subtitleInputRef = React.useRef(null)

  const [currentBlog, setBlog] = React.useState<BlogType>(initialBlogState)
  const { currentValidationError, touch, validate } = useBlogValidation({ domain: currentBlog })
  const { currentRequestStatus: currentBlogUpdateStatus, setRequestStatus: setBlogUpdateStatus, sendRequest: updateRequest } = useRequest({})
  const { currentRequestStatus: currentBlogFetchStatus, setRequestStatus: setBlogFetchStatus, sendRequest: fetchBlog } = useRequest({})
  const { blogId } = useParams();
  const userId = useAuthContext()

  /** lifecycle **/
  React.useEffect(() => {
    debug('initial fetch at useEffect')
    fetchBlog({
      path: '/blogs/' + blogId,
      method: RequestMethodEnum.GET
    })
      // call from previous 'catch' and 'then' of 'fetchBlog'
      // since resolve promise in the 'catch'
      .then((data: BlogResponseDataType) => {
        debug('then func of fetchBlog func')
        if (data) setBlog(data.blog)
      })
  }, []);

  /** EH **/
  const mapStateToFormData = (state: BlogType): FormData => {
    const formData = new FormData()
    formData.append('id', state.id)
    formData.set('title', state.title)
    formData.set('subtitle', state.subtitle)
    formData.set('mainImage', state.mainImage)
    formData.set('mainImageUrl', state.mainImageUrl)
    formData.set('content', state.content)
    formData.set('createdDate', state.createdDate.toJSON())
    formData.set('tags', JSON.stringify(state.tags))
    return formData
  }

  const handleSaveBlogClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = async (e) => {
    debug('start handling save button click')
    validate()
      .then(() => {
        debug('validation passed at save button event handler')
        updateRequest({
          path: '/blogs/' + blogId,
          method: RequestMethodEnum.PUT,
          headers: { 'content-type': 'multipart/form-data' },
          data: mapStateToFormData(currentBlog),
        })
      }, () => {
        debug('validation failed at save button event handler')
      })
  }

  const changeInputWidthDynamically = (inputRef: React.MutableRefObject<HTMLInputElement>, currentChLength: number): void => {
    inputRef.current.style.width = currentChLength > 30 ? currentChLength + 'ch' : 30 + 'ch';
  }

  const handleTitleChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setBlog({
      ...currentBlog,
      title: e.currentTarget.value
    })
    changeInputWidthDynamically(titleInputRef, e.currentTarget.value.length)
  }

  const handleSubTitleChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setBlog({
      ...currentBlog,
      subtitle: e.currentTarget.value
    })
    changeInputWidthDynamically(subtitleInputRef, e.currentTarget.value.length)
  }

  const handleImageUploadChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    const imgFile: File = e.currentTarget.files[0]
    const imgSrc: string = window.URL.createObjectURL(imgFile);
    setBlog({
      ...currentBlog,
      mainImage: imgFile,
      mainImageUrl: imgSrc,
    })
  }

  const handleRevokeObjectURLOnLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = (e) => {
    window.URL.revokeObjectURL(currentBlog.mainImageUrl);
  }

  const handleContentChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setBlog({
      ...currentBlog,
      content: e.currentTarget.value
    })
  }

  const handleTagInputEnterOrTabKeyClickEvent: React.EventHandler<React.KeyboardEvent<HTMLInputElement>> = (e) => {

    if (e.currentTarget.value === "") return false

    if (e.key == 'Enter' || e.key == 'Tab') {
      currentBlog.tags.add(e.currentTarget.value)
      setBlog({
        ...currentBlog,
      })
      e.currentTarget.value = ""
    }
  }

  const handleInitialFocusEvent: React.EventHandler<React.FocusEvent<HTMLInputElement>> = (e) => {
    touch(e.currentTarget.name)
  }

  const handleTagDeleteClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    
    const targetTag = e.currentTarget.getAttribute('data-tag')
    currentBlog.tags.delete(targetTag)
    setBlog({
      ...currentBlog
    })
  }

  const renderCurrentTags = () => {
    return Array.from(currentBlog.tags).map((tag: string) => {
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

  const isTagsLimit: boolean = currentBlog.tags.size >= 10

  //if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FETCHING) return (<p>fetching your data</p>)

  //if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FAILURE) return (<p>sorry.. your data is not available now</p>)

  return (//currentBlogFetchStatus.status === ResponseResultStatusEnum.SUCCESS &&
    <div className="context-wrapper">
      <div className="main-wrapper">
        <h2 className="profile-title">Update Blog</h2>
        <FetchStatus
          currentFetchStatus={currentBlogUpdateStatus}
          setFetchStatus={setBlogUpdateStatus}
          fetchingMsg={'updating...'}
          successMsg={'updating blog success'}
          failureMsg={'updating blog failed'}
        />
        <div className="blog-detail-picture-wrapper">
          <img src={currentBlog.mainImageUrl} className="blog-detail-picture-img" onLoad={handleRevokeObjectURLOnLoad} alt="selected image ..." width={'100%'} height={'6.66%'} />
          <div className="grid-picture-input-wrapper blog-detail-input-wrapper">
            <label htmlFor="update-blog-picture-input" className="btn grid-picture-label ">
              Select Main Image
              </label>
            <input type="file" name="mainImage" id="update-blog-picture-input" className="grid-picture-input " placeholder="enter blog image..." onChange={handleImageUploadChange} onFocus={handleInitialFocusEvent} />
          </div>
        </div>
        <div className="blog-detail-input-wrapper">
          <label htmlFor="title" className="grid-input-label blog-detail-input-label">
            Title
            </label>
          <input type="text" name="title" id="title" className="black-input grid-input blog-detail-input" placeholder="enter blog title..." value={currentBlog.title} onChange={handleTitleChangeEvent} onFocus={handleInitialFocusEvent} ref={titleInputRef}/>
          {(currentValidationError.title && <div className="input-error">{currentValidationError.title}</div>)}
        </div>
        <div className="blog-detail-input-wrapper">
          <label htmlFor="subtitle" className="grid-input-label blog-detail-input-label">
            Subtitle
            </label>
          <input type="text" name="subtitle" id="subtitle" className="black-input grid-input blog-detail-input" placeholder="enter blog subtitle..." value={currentBlog.subtitle} onChange={handleSubTitleChangeEvent} onFocus={handleInitialFocusEvent} ref={subtitleInputRef}/>
          {(currentValidationError.subtitle && <div className="input-error">{currentValidationError.subtitle}</div>)}
        </div>
        <div className="blog-detail-input-wrapper" >
          <label htmlFor="tag" className="grid-input-label blog-detail-input-label">Tags</label>
          {(!isTagsLimit &&
            <input type="text" id='tag-entry' name='tag-entry' className="black-input grid-input blog-detail-input" onKeyDown={handleTagInputEnterOrTabKeyClickEvent} ref={tagInputRef} placeholder="enter #tags here ..." />
          )}
          {(isTagsLimit &&
            <input type="text" id='tag-entry' name='tag-entry' className="black-input grid-input blog-detail-input" onKeyDown={handleTagInputEnterOrTabKeyClickEvent} ref={tagInputRef} placeholder="opps you reached max tags limit ..." readOnly />
          )}
          <div className="aside-filter-tags-list-selected">
            {renderCurrentTags()}
          </div>
        </div>
        <div className="blog-detail-input-wrapper">
          <label htmlFor="content" className="grid-input-label blog-detail-input-label">
            Content
            </label>
          <input type="text" name="content" id="content" className="black-input grid-input" placeholder="enter blog content..." value={currentBlog.content} onChange={handleTitleChangeEvent} onFocus={handleInitialFocusEvent} />
          {(currentValidationError.content && <div className="input-error">{currentValidationError.content}</div>)}
        </div>
        <div className="blog-detail-input-wrapper">
          <input type="button" className="btn" value="Save" name='submit' onClick={handleSaveBlogClickEvent} onFocus={handleInitialFocusEvent} />
          {(currentValidationError.submit && <div className="input-error">{currentValidationError.submit}</div>)}
        </div>
        <input type="hidden" name='creationDate' value={currentBlog.createdDate.toJSON()} />
      </div>
      <div className="aside-wrapper">
      </div>
    </div>
  );
}

export default UpdateBlog;







