import FetchStatus from 'Components/ApiFetch/FetchStatus';
import ImageInput from 'Components/Input/ImageInput';
import Tag from 'Components/Tag/Tag';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { BlogType, initialBlogState } from 'domain/blog/BlogType';
import { useRequest } from 'Hooks/Request/useRequest';
import { useBlogValidation } from 'Hooks/Validation/Blog/useBlogValidation';
import * as React from 'react';
import { useParams } from 'react-router';
import { BlogResponseDataType, RequestMethodEnum, ResponseResultStatusEnum, ResponseResultType } from 'requests/types';
import './UpdateBlog.scss';
import Input from 'Components/Input/Input';
import TagInput from 'Components/Input/TagInput';
import BlogContent from 'Components/BlogContent/BlogContent';
import { Node } from 'slate'
import { replaceTmpSrcWithPublicSrc } from 'Components/BlogContent/helpers';
var debug = require('debug')('ui:UpdateBlog')

const UpdateBlog: React.FunctionComponent<{}> = (props: {}) => {

  const titleInputRef = React.useRef(null)
  const subtitleInputRef = React.useRef(null)

  const [currentBlog, setBlog] = React.useState<BlogType>(initialBlogState)
  const { currentValidationError, touch, validate } = useBlogValidation({ domain: currentBlog })
  const { currentRequestStatus: currentBlogUpdateStatus, setRequestStatus: setBlogUpdateStatus, sendRequest: updateRequest } = useRequest({})
  const { currentRequestStatus: currentBlogFetchStatus, setRequestStatus: setBlogFetchStatus, sendRequest: fetchBlog } = useRequest({})
  const { blogId } = useParams();
  const { auth } = useAuthContext()

  /** lifecycle **/
  React.useEffect(() => {
    debug('initial fetch at useEffect')
    fetchBlog({
      path: '/blogs/' + blogId,
      method: RequestMethodEnum.GET
    })
      // call from previous 'catch' and 'then' of 'fetchBlog'
      // since resolve promise in the 'catch'
      .then((result: ResponseResultType<BlogResponseDataType>) => {
        debug('then func of fetchBlog func')
        if (result.status === ResponseResultStatusEnum.SUCCESS) {
          setBlog(result.data.blog)
        }
      })
  }, []);

  /** EH **/
  const mapStateToFormData = (state: BlogType): FormData => {
    const formData = new FormData()
    formData.append('id', state.id)
    formData.set('title', state.title)
    formData.set('subtitle', state.subtitle)
    formData.set('mainImage', state.mainImage)
    formData.set('content', JSON.stringify(state.content))
    formData.set('updatedDate', state.createdDate.toJSON())
    formData.set('tags', JSON.stringify(Array.from(state.tags)))
    state.blogImages.forEach((image: File) => {
      formData.append('blogImages[]', image)
    })
    /** 
     * put with form data does not work
     * so use 'method spoofing
     **/
    formData.set('_method', 'PUT')
    return formData
  }

  const handleSaveBlogClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = async (e) => {
    debug('start handling save button click')
    validate()
      .then(() => {
        debug('validation passed at save button event handler')

        debug('replace temp src image with publicSrc before submit')
        const blogDataForSubmit: BlogType = currentBlog
        blogDataForSubmit.content = replaceTmpSrcWithPublicSrc(blogDataForSubmit.content)
        debug(blogDataForSubmit)

        debug('start update request')
        updateRequest({
          path: '/blogs/' + blogId,
          method: RequestMethodEnum.PUT,
          headers: { 'content-type': 'multipart/form-data' },
          data: mapStateToFormData(blogDataForSubmit),
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

  const handleImageRemoveClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    setBlog({
      ...currentBlog,
      mainImage: null,
      mainImageUrl: null,
    })
  }

  const handleRevokeObjectURLOnLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = (e) => {
    window.URL.revokeObjectURL(currentBlog.mainImageUrl);
  }

  const handleContentChangeEvent = (content: Node[], imageFiles: File[]): void => {
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
    touch(e.currentTarget.name)
  }

  if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FETCHING) return (<p>fetching your data</p>)

  if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FAILURE) return (<p>sorry.. your data is not available now</p>)

  return (currentBlogFetchStatus.status === ResponseResultStatusEnum.SUCCESS &&
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
        <ImageInput
          handleImageUploadChange={handleImageUploadChange}
          handleImageRemoveClick={handleImageRemoveClick}
          handleRevokeObjectURLOnLoad={handleRevokeObjectURLOnLoad}
          id={"update-blog-picture-input"}
          imgStyle={"blog-detail-picture-img" } 
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
        <div className="blog-detail-input-wrapper">
          <input type="button" className="btn" value="Save" name='submit' onClick={handleSaveBlogClickEvent} onFocus={handleInitialFocusEvent} role='save-btn'/>
          {(currentValidationError.submit && <div className="small-input-error">{currentValidationError.submit}</div>)}
        </div>
        <input type="hidden" name='creationDate' value={currentBlog.createdDate.toJSON()} />
      </div>
      <div className="aside-wrapper">
      </div>
    </div>
  );
}

export default UpdateBlog;







