import * as React from 'react';
import { UseBlogAutoSaveStatusInputType, UseBlogAutoSaveStatusOutputType } from './types';
import { Node, Element } from 'Components/fork/slate'
import { ResponseResultStatusEnum, RequestMethodEnum, ResponseResultType, BlogResponseDataType } from 'requests/types';
import { BlogType } from 'domain/blog/BlogType';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { logger } from 'configs/logger';
import cloneDeep from 'lodash/cloneDeep';
import { replaceTmpSrcWithPublicSrc } from 'Components/BlogContent/helpers';
import { useRequest } from 'Hooks/Request/useRequest';
import { FetchContextEnum } from 'Components/EditBlog/EditBlog';
import { appConfig } from 'configs/appConfig';
const log = logger("useBlogAutoSave");


export const useBlogAutoSave = (input: UseBlogAutoSaveStatusInputType): UseBlogAutoSaveStatusOutputType => {

  const { auth } = useAuthContext()
  const { currentRequestStatus: currentBlogAutoSaveStatus, setRequestStatus: setBlogAutoSaveStatus, sendRequest: saveBlogAutoSaveRequest } = useRequest({})

  const mapStateToFormData = (state: BlogType): FormData => {
    const formData = new FormData()
    formData.set('userId', auth.user.id)
    formData.set('title', state.title)
    formData.set('subtitle', state.subtitle)
    if (state.mainImage) formData.set('mainImage', state.mainImage)
    if (input.currentIsDeleteMainImage) formData.set('isDeleteMainImage', '1') // true
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

  React.useEffect(() => {
    function autoSave() {
      log('validation passed at save button event handler')

      const blogDataForSubmit: BlogType = cloneDeep(input.currentBlog)
      log('setup blogImages and blogImagePaths')
      const imageList: File[] = []
      const imagePathList: string[] = []
      input.currentBlog.content.forEach((node: Element) => {
        if (node.type === 'image') {
          if (node.isNew) {
            imageList.push(node.imageFile)
            imagePathList.push(node.publicSrc)
          } else {
            imagePathList.push(node.src)
          }
        }
      })

      log('replace temp src image with publicSrc before submit')
      blogDataForSubmit.content = replaceTmpSrcWithPublicSrc(blogDataForSubmit.content)
      blogDataForSubmit.blogImages = imageList
      blogDataForSubmit.blogImagePaths = imagePathList
      log(blogDataForSubmit)

      log('start update request')
      saveBlogAutoSaveRequest({
        path: 'blogs/' + input.blogId,
        method: RequestMethodEnum.PUT,
        headers: { 'content-type': 'multipart/form-data' },
        data: mapStateToFormData(blogDataForSubmit),
      })
        .then((result: ResponseResultType<BlogResponseDataType>) => {
          // do something 
        })
    }
    
    // debounce feature
    // refernce: https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
    const handler = setTimeout(() => {
      // give condition to make this allow to request only if initial blog data is seeded from server
      if (input.isInitialGetFetchDone) {
        log("start autoSave useEffect at EditBlog")
        autoSave()
        input.setFetchContext(FetchContextEnum.SAVE)
      }
    }, appConfig.debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [
      input.currentBlog.mainImageUrl,
      input.currentBlog.title,
      input.currentBlog.subtitle,
      JSON.stringify(Array.from(input.currentBlog.tags)),
      JSON.stringify(input.currentBlog.content),
    ])

  return {
    currentBlogAutoSaveStatus: currentBlogAutoSaveStatus,
    setBlogAutoSaveStatus: setBlogAutoSaveStatus
  }
}

