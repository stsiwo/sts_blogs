import { BlogType } from "domain/blog/BlogType";
import { FetchContextEnum } from "Components/EditBlog/EditBlog";
import { ResponseResultType } from "requests/types";

export declare type UseBlogAutoSaveStatusInputType = {
  currentBlog: BlogType 
  blogId: string
  currentIsDeleteMainImage: boolean
  isInitialGetFetchDone: boolean
  setFetchContext: React.Dispatch<React.SetStateAction<FetchContextEnum>> 
}

export declare type UseBlogAutoSaveStatusOutputType = {
  currentBlogAutoSaveStatus: ResponseResultType
  setBlogAutoSaveStatus: React.Dispatch<React.SetStateAction<ResponseResultType>>
}
