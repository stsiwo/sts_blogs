import { BlogType } from "./BlogType";

export declare type BlogValidationType = {
  [P in keyof BlogType]: string
}

export const initialBlogValidationState: BlogValidationType = {
  id: '',
  title: '',
  subTitle: '',
  mainImage: '',
  mainImageUrl: '',
  content: '',
  tags: '',
  createdDate: ''
}
