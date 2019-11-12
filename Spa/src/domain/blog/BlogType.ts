import { AuthorType } from "../author/AuthorType";
import { TagType } from "../tag/TagType";

export declare type BlogType = {
  id: string,
  title: string,
  subtitle: string,
  mainImage?: Blob,
  mainImageUrl?: string,
  content: string,
  createdDate: Date
  //author: AuthorType,
  tags?: TagType[],
}

export const initialBlogState: BlogType = {
  id: '',
  title: '',
  subtitle: '',
  mainImage: null,
  mainImageUrl: '',
  content: '',
  tags: [],
  createdDate: new Date()
}
