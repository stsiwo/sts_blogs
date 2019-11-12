import * as React from 'react';
import './NewBlog.scss';
import { useParams } from 'react-router';
import * as yup from 'yup'
import { BlogType, initialBlogState } from '../../../../../domain/blog/BlogType';
import { BlogValidationType, initialBlogValidationState } from '../../../../../domain/blog/BlogValidationType';
import { RequestMethodEnum, ResponseResultType } from '../../../../../requests/types';
import { request } from '../../../../../requests/request';
import { TagType } from '../../../../../domain/tag/TagType';

const NewBlog: React.FunctionComponent<{}> = (props: {}) => {

  /** ref **/
  const tagInputRef = React.useRef(null)
  /** state **/
  const [currentBlog, setBlog] = React.useState<BlogType>(initialBlogState)
  const [currentValidationError, setValidationError] = React.useState<BlogValidationType>(initialBlogValidationState)
  /** redux **/
  /** hooks **/
  const userId = 1

  /** anything else **/
  const path: string = '/users/' + userId + '/blogs/' 
  const method: RequestMethodEnum = RequestMethodEnum.POST 

  let schema = yup.object().shape<BlogType>({
    id: yup.string(),
    title: yup.string().required(),
    subtitle: yup.string().required(),
    content: yup.string().required(),
    createdDate: yup.date().required(),
  });

  /** lifecycle **/
  React.useEffect(() => {
    function validateFormInput() {
      schema
        .validate(currentBlog)
        .then(() => {
          console.log('validation passed')
          setValidationError({
            ...initialBlogValidationState
          })
        })
        .catch((error: yup.ValidationError) => {
          console.log('validation error detected')
          currentValidationError[error.path as keyof BlogType] = error.message
          setValidationError({
            ...currentValidationError
          })
        })
    }
    console.log('validating input.... should be called only mount and when input is updated')
    validateFormInput()
    return () => {
    };
  }, [...Object.keys(currentBlog).map((key: string) => currentBlog[key as keyof BlogType])]);

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
    formData.set('tags', JSON.stringify(state.tags))
    return formData
  }

  const handleSaveBlogClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = async (e) => {
    // validation here?
    console.log('skipping validation ...')

    // initialize FormData and map state to items of FormDate
    const formData: FormData = mapStateToFormData(currentBlog)

    // set headers (multipart/form-data)
    const headers: {} = { 'content-type': 'multipart/form-data' }

    // send request
    const responseResult: ResponseResultType = await request({
      url: path,
      method: method,
      headers: headers,
      data: formData
    })
  }

  //  const handleInputChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
  //    currentBlog[e.currentTarget.name] = e.currentTarget.value
  //    setBlog({
  //      ...currentBlog 
  //    })
  //  }

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
  /** render **/
  /** should separate 'new' and 'update' component **/
  return (
    <div className="blog-detail-wrapper">
      <h2 className="blog-detail-title">New/Update Blog</h2>
      <form className="blog-detail-form">
        <div className="blog-detail-form-title-wrapper" >
          <label htmlFor="title" className="blog-detail-form-title-label">Title</label>
          <input type="text" name="title" id="title" className="blog-detail-form-title-input" placeholder="enter blog title..." value={currentBlog.title} onChange={handleTitleChangeEvent} />
          {(currentValidationError.title && <div className="input-error">{currentValidationError.title}</div>)}
        </div>
        <div className="blog-detail-form-subtitle-wrapper" >
          <label htmlFor="subtitle" className="blog-detail-form-subtitle-label">Sub Title</label>
          <input type="text" name="subtitle" id="subtitle" className="blog-detail-form-subtitle-input" placeholder="enter blog subtitle..." value={currentBlog.subtitle} onChange={handleSubTitleChangeEvent} />
          {(currentValidationError.subtitle && <div className="input-error">{currentValidationError.subtitle}</div>)}
        </div>
        <div className="blog-detail-form-tags-wrapper" >
          <label htmlFor="tags" className="blog-detail-form-tags-label">Tags</label>
          {(
            currentBlog.tags.map((tag: TagType) => {
              console.log('rendering tags')
              return <input type="text" name="tags[]" id="tags" className="blog-detail-form-tags-input" value={tag.name} readOnly key={tag.name} />
            })
          )}
          <input type="text" id="tags" className="blog-detail-form-tags-input" placeholder="enter blog tags..." onKeyDown={handleTagInputEnterOrTabKeyClickEvent} ref={tagInputRef} />
          {(currentValidationError.tags && <div className="input-error">{currentValidationError.tags}</div>)}
        </div>
        <div className="blog-detail-form-image-wrapper" >
          <label htmlFor="tags" className="blog-detail-form-image-label">Main Image</label>
          <input type="file" name="tags" id="tags" className="blog-detail-form-image-input" placeholder="enter blog image..." onChange={handleImageUploadChange} />
          <img src={currentBlog.mainImageUrl} className="" onLoad={handleRevokeObjectURLOnLoad} alt="selected image ..." width={100} height={100} />
        </div>
        <div className="blog-detail-form-content-wrapper" >
          <label htmlFor="content" className="blog-detail-form-content-label">Content</label>
          <input type="text" name="content" id="content" className="blog-detail-form-content-input" placeholder="enter blog content..." value={currentBlog.content} onChange={handleContentChangeEvent} />
          {(currentValidationError.content && <div className="input-error">{currentValidationError.content}</div>)}
        </div>
        <input type="hidden" name='creationDate' value={currentBlog.createdDate.toJSON()} />
        <div className="blog-detail-btns-wrapper">
          <input type="button" className="blog-detail-btns-save" value="Save" onClick={handleSaveBlogClickEvent} />
        </div>
      </form>
    </div>
  );
}

export default NewBlog;







