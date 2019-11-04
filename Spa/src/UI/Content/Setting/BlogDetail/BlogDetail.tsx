import * as React from 'react';
import './BlogDetail.scss';
import { useParams } from 'react-router';
import { RequestMethodEnum, ResponseResultType, ResponseResultStatusEnum } from '../../../../requests/types';
import { useApiFetch } from '../../../Base/Components/ApiFetch/useApiFetch';
import { BlogType } from '../../../../domain/blog/BlogType';
import { request } from '../../../../requests/request';
import { TagType } from '../../../../domain/tag/TagType';

const BlogDetail: React.FunctionComponent<{}> = (props: {}) => {

  /** ref **/
  const tagInputRef = React.useRef(null)
  /** state **/
  const [currentBlog, setBlog] = React.useState<BlogType>({
    id: '',
    title: 'test-title',
    subTitle: 'test-subTitle',
    mainImage: null,
    mainImageUrl: 'main-image-url',
    content: 'test-content',
    tags: [{ name: 'testtag' }, { name: 'testtag1'}],
    createdDate: new Date() 
  })
  /** redux **/
  /** hooks **/
  const { blogId } = useParams();
  const userId = 1 // need to get from somewhere

  /** anything else **/
  let path: string = null
  let method: RequestMethodEnum = null
  
  if (blogId == 'new') {
    path = '/users/' + userId + '/blogs/'
    method = RequestMethodEnum.POST
  } else {
    // 1. get specified blog from server
    path = '/blogs/' + blogId
    method = RequestMethodEnum.GET
    const { fetchStatus } = useApiFetch({
      path: path,
      method: method
    })
    if (fetchStatus.data) setBlog(fetchStatus.data.blog)
  }


  /** EH **/
  const mapStateToFormData = (state: BlogType): FormData => {
    const formData = new FormData()
    if (state.id) formData.append('id', state.id)
    formData.set('title', state.title)
    formData.set('subTitle', state.subTitle)
    formData.set('mainImage', state.mainImage)
    formData.set('mainImageUrl', state.mainImageUrl)
    formData.set('content', state.content)
    formData.set('createDate', state.createdDate.toJSON())
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

  const handleTitleChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setBlog({
      ...currentBlog,
      title: e.currentTarget.value 
    })
  }

  const handleSubTitleChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setBlog({
      ...currentBlog,
      subTitle: e.currentTarget.value 
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
  return (
    <div className="blog-detail-wrapper">
      <h2 className="blog-detail-title">New/Update Blog</h2>
      <form className="blog-detail-form">
        <div className="blog-detail-form-title-wrapper" >
          <label htmlFor="title" className="blog-detail-form-title-label">Title</label>
          <input type="text" name="title" id="title" className="blog-detail-form-title-input" placeholder="enter blog title..." value={currentBlog.title} onChange={handleTitleChangeEvent}/>
        </div>
        <div className="blog-detail-form-subtitle-wrapper" >
          <label htmlFor="subtitle" className="blog-detail-form-subtitle-label">Sub Title</label>
          <input type="text" name="subtitle" id="subtitle" className="blog-detail-form-subtitle-input" placeholder="enter blog subtitle..." value={currentBlog.subTitle} onChange={handleSubTitleChangeEvent}/>
        </div>
        <div className="blog-detail-form-tags-wrapper" >
          <label htmlFor="tags" className="blog-detail-form-tags-label">Tags</label>
          {(
            currentBlog.tags.map(( tag: TagType ) => {
              console.log('rendering tags')
              return <input type="text" name="tags[]" id="tags" className="blog-detail-form-tags-input" value={tag.name} readOnly key={tag.name}/>
            })
          )}
          <input type="text" id="tags" className="blog-detail-form-tags-input" placeholder="enter blog tags..." onKeyDown={handleTagInputEnterOrTabKeyClickEvent} ref={tagInputRef} />
        </div>
        <div className="blog-detail-form-image-wrapper" >
          <label htmlFor="tags" className="blog-detail-form-image-label">Main Image</label>
          <input type="file" name="tags" id="tags" className="blog-detail-form-image-input" placeholder="enter blog image..." onChange={handleImageUploadChange}/>
          <img src={currentBlog.mainImageUrl} className="" onLoad={handleRevokeObjectURLOnLoad} alt="selected image ..." width={100} height={100}/>
        </div>
        <div className="blog-detail-form-content-wrapper" >
          <label htmlFor="content" className="blog-detail-form-content-label">Content</label>
          <input type="text" name="content" id="content" className="blog-detail-form-content-input" placeholder="enter blog content..." value={currentBlog.content} onChange={handleContentChangeEvent}/>
        </div>
        <input type="hidden" name='creationDate' value={currentBlog.createdDate.toJSON()} />
        <div className="blog-detail-btns-wrapper">
          <input type="button" className="blog-detail-btns-save" value="Save" onClick={handleSaveBlogClickEvent}/>
        </div>
      </form>
    </div>
  );
}

export default BlogDetail;






