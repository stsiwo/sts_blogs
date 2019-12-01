import { BlogType, initialBlogState } from 'domain/blog/BlogType';
import { TagType } from 'domain/tag/TagType';
import * as React from 'react';
import { useParams } from 'react-router';
import { RequestMethodEnum, ResponseResultStatusEnum } from 'requests/types';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { useRequest } from 'Hooks/Request/useRequest';
import { useBlogValidation } from 'Hooks/Validation/Blog/useBlogValidation';
import './NewBlog.scss';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
import ImageInput from 'Components/Input/ImageInput';
import Input from 'Components/Input/Input';
import TagInput from 'Components/Input/TagInput';
import BlogContent from 'Components/BlogContent/BlogContent';
var debug = require('debug')('ui:NewBlog')

const NewBlog: React.FunctionComponent<{}> = (props: {}) => {

  const titleInputRef: React.MutableRefObject<HTMLInputElement> = { current: null }
  const subtitleInputRef: React.MutableRefObject<HTMLInputElement> = { current: null }

  const [currentBlog, setBlog] = React.useState<BlogType>(initialBlogState)
  const { currentValidationError, touch, validate } = useBlogValidation({ domain: currentBlog })
  const { currentRequestStatus: currentNewBlogStatus, setRequestStatus: setNewBlogStatus, sendRequest: saveRequest } = useRequest({})
  const { blogId } = useParams();
  const { auth } = useAuthContext()
  /** anything else **/
  const path: string = '/users/' + auth.user.id + '/blogs/'
  const method: RequestMethodEnum = RequestMethodEnum.POST

  /** EH **/
  const mapStateToFormData = (state: BlogType): FormData => {
    const formData = new FormData()
    if (state.id) formData.append('id', state.id)
    formData.set('title', state.title)
    formData.set('subtitle', state.subtitle)
    formData.set('mainImage', state.mainImage)
    formData.set('mainImageUrl', state.mainImageUrl)
    formData.set('content', state.content)
    formData.set('createdDate', state.createdDate.toJSON())
    formData.set('tags', JSON.stringify(Array.from(state.tags)))
    state.blogImages.forEach((image: File) => {
      formData.append('blogImages[]', image)
    })
    return formData
  }

  const handleSaveBlogClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = async (e) => {
    debug('start handling save button click')
    validate()
      .then(() => {
        debug('validation passed at save button event handler')
        saveRequest({
          path: path,
          method: method,
          headers: { 'content-type': 'multipart/form-data' },
          data: mapStateToFormData(currentBlog),
        })
      }, () => {
        debug('validation failed at save button event handler')
      })
  }

  const changeInputWidthDynamically = (inputRef: React.MutableRefObject<HTMLInputElement>, currentChLength: number): void => {
    console.log(inputRef)
    console.log(currentChLength)
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

  const handleContentChangeEvent = (content: string, imageFiles: File[]): void => {
    console.log('handle content change event')
    console.log(currentBlog)
    setBlog((prev: BlogType) => {
      return {
        ...prev,
        content: content,
        blogImages: imageFiles
      }
    })
    /**
     *  if i write this currentBlog does not contain any value when send this to child component and update it
     *  #REFACTOR
     *
     * setBlog({
     *  ...currentBlog,
     *  content: content 
     **/
  }

  const handleInitialFocusEvent: React.EventHandler<React.FocusEvent<HTMLInputElement>> = (e) => {
    const targetName: string = e.currentTarget.name ? e.currentTarget.name : e.currentTarget.getAttribute('data-name')
    touch(targetName)
  }

  /** render **/
  return (
    <div className="context-wrapper">
      <div className="main-wrapper">
        <h2 className="profile-title">New Blog</h2>
        <FetchStatus
          currentFetchStatus={currentNewBlogStatus}
          setFetchStatus={setNewBlogStatus}
          fetchingMsg={'saving...'}
          successMsg={'ok'}
          failureMsg={'failed'}
        />
        <ImageInput
          handleImageUploadChange={handleImageUploadChange}
          handleRevokeObjectURLOnLoad={handleRevokeObjectURLOnLoad}
          id={"update-blog-picture-input"}
          imgStyle={"blog-detail-picture-img"}
          inputStyle={"grid-picture-input"}
          inputValue={null}
          label={"Select Main Image"}
          labelStyle={"btn grid-picture-label"}
          labelWrapperStyle={"grid-picture-input-wrapper blog-detail-input-wrapper"}
          name={"mainImage"}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter blog image..."}
          src={currentBlog.mainImageUrl}
          wrapperStyle={"blog-detail-picture-wrapper"}
        />
        <Input
          id={"title"}
          inputStyle={"black-input grid-input blog-detail-input"}
          inputValue={currentBlog.title}
          label={"Title"}
          labelStyle={"grid-input-label blog-detail-input-label"}
          name={"title"}
          onInputChange={handleTitleChangeEvent}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter blog title..."}
          wrapperStyle={'blog-detail-input-wrapper'}
          errorMsg={currentValidationError.title}
          forwardRef={titleInputRef}
        />
        <Input
          id={"subtitle"}
          inputStyle={"black-input grid-input blog-detail-input"}
          inputValue={currentBlog.subtitle}
          label={"Subtitle"}
          labelStyle={"grid-input-label blog-detail-input-label"}
          name={"subtitle"}
          onInputChange={handleSubTitleChangeEvent}
          onInputFocus={handleInitialFocusEvent}
          placeholder={"enter blog subtitle..."}
          wrapperStyle={'blog-detail-input-wrapper'}
          errorMsg={currentValidationError.subtitle}
          forwardRef={subtitleInputRef}
        />
        <TagInput
          id={"tag"}
          inputStyle={"black-input grid-input blog-detail-input"}
          inputValue={currentBlog.tags}
          label={"Tags"}
          labelStyle={"grid-input-label blog-detail-input-label"}
          onInputFocus={handleInitialFocusEvent}
          wrapperStyle={'blog-detail-input-wrapper'}
          currentBlog={currentBlog}
          setBlog={setBlog}
        />
        <BlogContent 
          userId={auth.user.id}
          name="content"
          id="content"
          value={currentBlog.content} 
          placeholder="enter blog content..."
          onChange={handleContentChangeEvent} 
          onFocus={handleInitialFocusEvent} 
          errorMsg={currentValidationError.content}
        />
        <input type="hidden" name='creationDate' value={currentBlog.createdDate.toJSON()} />
        <div className="blog-detail-input-wrapper">
          <input type="button" className="btn" value="Save" name='submit' onClick={handleSaveBlogClickEvent} onFocus={handleInitialFocusEvent} />
          {(currentValidationError.submit && <div className="input-error">{currentValidationError.submit}</div>)}
        </div>
      </div>
      <div className="aside-wrapper">
      </div>
    </div>
  );
}

export default NewBlog;







