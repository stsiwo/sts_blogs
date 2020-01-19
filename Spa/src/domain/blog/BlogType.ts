import { AuthorType } from "../author/AuthorType";
import { TagType } from "../tag/TagType";
import { Node } from 'Components/fork/slate'

export declare type BlogType = {
  id: string,
  title: string,
  subtitle: string,
  mainImage?: Blob,
  mainImageUrl?: string,
  content: Node[],
  createdDate: Date
  author?: AuthorType,
  tags?: Set<string>,
  blogImages?: File[],
  blogImagePaths?: string[],
}

export const initialBlogState: BlogType = {
  id: '',
  title: '',
  subtitle: '',
  mainImage: null,
  mainImageUrl: '',
  content: [],
  tags: new Set<string>(),
  author: null,
  createdDate: new Date()
}
