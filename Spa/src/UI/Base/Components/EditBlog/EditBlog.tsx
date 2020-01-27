import { BlogType, initialBlogState } from 'domain/blog/BlogType';
import { TagType } from 'domain/tag/TagType';
import * as React from 'react';
import { useParams } from 'react-router';
import { RequestMethodEnum, ResponseResultStatusEnum, ResponseResultType, BlogResponseDataType } from 'requests/types';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { useRequest } from 'Hooks/Request/useRequest';
import { useBlogValidation } from 'Hooks/Validation/Blog/useBlogValidation';
import './EditBlog.scss';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
import ImageInput from 'Components/Input/ImageInput';
import Input from 'Components/Input/Input';
import TagInput from 'Components/Input/TagInput';
import BlogContent from 'Components/BlogContent/BlogContent';
import { Node } from 'Components/fork/slate'
import { replaceTmpSrcWithPublicSrc } from 'Components/BlogContent/helpers';
import cloneDeep = require('lodash/cloneDeep');
import { generateFileWithUuidv4, getUuidv4 } from 'src/utils';
import { RequestStatusType } from 'Hooks/Request/types';
var debug = require('debug')('ui:EditBlog')

declare type EditBlogPropsType = {
  context: string
  blogId: string
  currentBlog: BlogType
  setBlog: React.Dispatch<React.SetStateAction<BlogType>>
  currentBlogFetchStatus?: RequestStatusType
  setBlogFetchStatus?: React.Dispatch<React.SetStateAction<RequestStatusType>>
}

enum FetchContextEnum {
  SAVE,
  PUBLISH
}

const EditBlog: React.FunctionComponent<EditBlogPropsType> = ({ context, blogId, currentBlog, setBlog }) => {

  const titleInputRef: React.MutableRefObject<HTMLInputElement> = { current: null }
  const subtitleInputRef: React.MutableRefObject<HTMLInputElement> = { current: null }

  const [currentIsDeleteImage, setIsDeleteImage] = React.useState<boolean>(false)
  const { currentValidationError, touch, validate } = useBlogValidation({ domain: currentBlog })
  const { currentRequestStatus: currentBlogStatus, setRequestStatus: setBlogStatus, sendRequest: saveRequest } = useRequest({})
  const { currentRequestStatus: currentPublishStatus, setRequestStatus: setPublishStatus, sendRequest: publishRequest } = useRequest({})
  const [curFetchContext, setFetchContext] = React.useState<FetchContextEnum>(FetchContextEnum.PUBLISH)
  const { auth } = useAuthContext()

  /** EH **/
  const mapStateToFormData = (state: BlogType): FormData => {
    const formData = new FormData()
    formData.set('userId', auth.user.id)
    formData.set('title', state.title)
    formData.set('subtitle', state.subtitle)
    if (state.mainImage) formData.set('mainImage', state.mainImage)
    if (currentIsDeleteImage) formData.set('isDeleteImage', '1') // true
    formData.set('content', JSON.stringify(state.content))
    formData.set('createdDate', state.createdDate.toJSON())
    formData.set('tags', JSON.stringify(Array.from(state.tags)))
    if (state.blogImagePaths && state.blogImagePaths.length !== 0) formData.set('blogImagePaths', JSON.stringify(state.blogImagePaths))
    if (state.blogImagePaths) {
      state.blogImages.forEach((image: File) => {
        formData.append('blogImages[]', image)
      })
    }
    return formData
  }

  const handlePublishBlogClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = async (e) => {
    debug('start handling publish button click')
    validate()
      .then(() => {
        setFetchContext(FetchContextEnum.PUBLISH)
        publishRequest({
          path: "/blogs/" + blogId,
          method: RequestMethodEnum.PATCH,
          headers: { 'content-type': 'application/json' },
          data: JSON.stringify({ publish: 1 }),
        })
          .then((result: ResponseResultType<BlogResponseDataType>) => {
            // do something 
          })
      }, () => {
        debug('validation failed at publish button event handler')
      })
  }

  React.useEffect(() => {
    function autoSave() {
      debug('validation passed at save button event handler')

      debug('replace temp src image with publicSrc before submit')
      const blogDataForSubmit: BlogType = cloneDeep(currentBlog)
      blogDataForSubmit.content = replaceTmpSrcWithPublicSrc(blogDataForSubmit.content)
      debug(blogDataForSubmit)

      debug('start update request')
      saveRequest({
        path: 'blogs/' + blogId,
        method: RequestMethodEnum.PUT,
        headers: { 'content-type': 'multipart/form-data' },
        data: mapStateToFormData(blogDataForSubmit),
      })
        .then((result: ResponseResultType<BlogResponseDataType>) => {
          // do something 
        })
    }
    autoSave()
    setFetchContext(FetchContextEnum.SAVE)
  }, [currentBlog])


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
    let imgFile: File = e.currentTarget.files[0]
    imgFile = generateFileWithUuidv4(imgFile)
    const imgSrc: string = window.URL.createObjectURL(imgFile);
    setIsDeleteImage(false)
    setBlog({
      ...currentBlog,
      mainImage: imgFile,
      mainImageUrl: imgSrc,
    })
  }

  const handleImageRemoveClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    setIsDeleteImage(true)
    setBlog({
      ...currentBlog,
      mainImage: null,
      mainImageUrl: null,
    })
  }

  const handleRevokeObjectURLOnLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = (e) => {
    window.URL.revokeObjectURL(currentBlog.mainImageUrl);
  }

  const handleContentChangeEvent = (content: Node[], imageFiles: File[], imagePaths: string[]): void => {
    setBlog((prev: BlogType) => {
      return {
        ...prev,
        content: content,
        blogImages: imageFiles,
        blogImagePaths: imagePaths
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

  return (
    <div className="context-wrapper">
      <div className="main-wrapper">
        <h2 className="profile-title">{context} Blog</h2>
        {(curFetchContext === FetchContextEnum.SAVE &&
        <FetchStatus
          currentFetchStatus={currentBlogStatus}
          setFetchStatus={setBlogStatus}
          fetchingMsg={'saving...'}
          successMsg={'ok'}
          failureMsg={'failed'}
        />
        )}
        {(curFetchContext === FetchContextEnum.PUBLISH &&
        <FetchStatus
          currentFetchStatus={currentPublishStatus}
          setFetchStatus={setPublishStatus}
          fetchingMsg={'publishing...'}
          successMsg={'ok'}
          failureMsg={'failed'}
        />
        )}
        <ImageInput
          handleImageUploadChange={handleImageUploadChange}
          handleImageRemoveClick={handleImageRemoveClick}
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
          <input type="button" className="btn" value="Publish" name='submit' onClick={handlePublishBlogClickEvent} onFocus={handleInitialFocusEvent} role="publish-btn" />
          {(currentValidationError.submit && <div className="input-error" role="summary-input-error">{currentValidationError.submit}</div>)}
        </div>
      </div>
      <div className="aside-wrapper">
      </div>
    </div>
  );
}

export default EditBlog;
