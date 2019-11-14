import { BlogType, initialBlogState } from 'domain/blog/BlogType';
import { TagType } from 'domain/tag/TagType';
import * as React from 'react';
import { useParams } from 'react-router';
import { BlogResponseDataType, RequestMethodEnum, ResponseResultStatusEnum } from 'requests/types';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { useRequest } from 'Hooks/Request/useRequest';
import { useBlogValidation } from 'Hooks/Validation/Blog/useBlogValidation';
import './UpdateBlog.scss';
var debug = require('debug')('ui:UpdateBlog')

const UpdateBlog: React.FunctionComponent<{}> = (props: {}) => {

  const tagInputRef = React.useRef(null)

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

  const handleTitleChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setBlog({
      ...currentBlog,
      title: e.currentTarget.value
    })
  }

  const handleSubTitleChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setBlog({
      ...currentBlog,
      subtitle: e.currentTarget.value
    })
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
      currentBlog.tags.push({ name: e.currentTarget.value })
      setBlog({
        ...currentBlog,
      })
      e.currentTarget.value = ""
    }
  }

  const handleInitialFocusEvent: React.EventHandler<React.FocusEvent<HTMLInputElement>> = (e) => {
    touch(e.currentTarget.name)
  }

  if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FETCHING) return (<p>fetching your data</p>)

  if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FAILURE) return (<p>sorry.. your data is not available now</p>)

  return (currentBlogFetchStatus.status === ResponseResultStatusEnum.SUCCESS &&
    <div className="blog-detail-wrapper">
      <h2 className="blog-detail-title">Update Blog</h2>
      {(currentBlogUpdateStatus.status === ResponseResultStatusEnum.FETCHING && <p>updating ...</p>)}
      {(currentBlogUpdateStatus.status === ResponseResultStatusEnum.FAILURE && <p>updating blog failed</p>)}
      {(currentBlogUpdateStatus.status === ResponseResultStatusEnum.SUCCESS && <p>updating blog success</p>)}
      <form className="blog-detail-form">
        <div className="blog-detail-form-title-wrapper" >
          <label htmlFor="title" className="blog-detail-form-title-label">Title</label>
          <input type="text" name="title" id="title" className="blog-detail-form-title-input" placeholder="enter blog title..." value={currentBlog.title} onChange={handleTitleChangeEvent}  onFocus={handleInitialFocusEvent}/>
          {(currentValidationError.title && <div className="input-error">{currentValidationError.title}</div>)}
        </div>
        <div className="blog-detail-form-subtitle-wrapper" >
          <label htmlFor="subtitle" className="blog-detail-form-subtitle-label">Subtitle</label>
          <input type="text" name="subtitle" id="subtitle" className="blog-detail-form-subtitle-input" placeholder="enter blog subtitle..." value={currentBlog.subtitle} onChange={handleSubTitleChangeEvent} onFocus={handleInitialFocusEvent}/>
          {(currentValidationError.subtitle && <div className="input-error">{currentValidationError.subtitle}</div>)}
        </div>
        <div className="blog-detail-form-tags-wrapper" >
          <label htmlFor="tags" className="blog-detail-form-tags-label">Tags</label>
          {(
            currentBlog.tags.length !== 0 && currentBlog.tags.map((tag: TagType) => {
              return <input type="text" name="tags[]" id="tags" className="blog-detail-form-tags-input" value={tag.name} readOnly key={tag.name} />
            })
          )}
          <input type="text" id="tag-entry" className="blog-detail-form-tags-input" placeholder="enter blog tags..." onKeyDown={handleTagInputEnterOrTabKeyClickEvent} ref={tagInputRef} />
          {(currentValidationError.tags && <div className="input-error">{currentValidationError.tags}</div>)}
        </div>
        <div className="blog-detail-form-image-wrapper" >
          <label htmlFor="tags" className="blog-detail-form-image-label">Main Image</label>
          <input type="file" name="tags" id="tags" className="blog-detail-form-image-input" placeholder="enter blog image..." onChange={handleImageUploadChange} onFocus={handleInitialFocusEvent}/>
          <img src={currentBlog.mainImageUrl} className="" onLoad={handleRevokeObjectURLOnLoad} alt="selected image ..." width={100} height={100} />
        </div>
        <div className="blog-detail-form-content-wrapper" >
          <label htmlFor="content" className="blog-detail-form-content-label">Content</label>
          <input type="text" name="content" id="content" className="blog-detail-form-content-input" placeholder="enter blog content..." value={currentBlog.content} onChange={handleContentChangeEvent} onFocus={handleInitialFocusEvent}/>
          {(currentValidationError.content && <div className="input-error">{currentValidationError.content}</div>)}
        </div>
        <input type="hidden" name='creationDate' value={currentBlog.createdDate.toJSON()} />
        <div className="blog-detail-btns-wrapper">
          <input type="button" className="blog-detail-btns-save" value="Save" name='submit' onClick={handleSaveBlogClickEvent} onFocus={handleInitialFocusEvent}/>
          {(currentValidationError.submit && <div className="input-error">{currentValidationError.submit}</div>)}
        </div>
      </form>
      )}
    </div>
  );
}

export default UpdateBlog;







