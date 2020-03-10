import { BlogType } from "./BlogType";

export declare type BlogValidationType = {
  title: string
  subtitle: string
}

export const initialBlogValidationState: BlogValidationType = {
  title: '',
  subtitle: '',
}
