import { AuthorType } from "../author/AuthorType";
import { TagType } from "../tag/TagType";

export declare type BlogType = {
  id: string,
  title: string,
  subTitle: string,
  mainImage?: Blob,
  mainImageUrl?: string,
  content: string,
  createdDate: Date
  //author: AuthorType,
  tags?: TagType[],
}

export const initialBlogState: BlogType = {
  id: '',
  title: 'test-title',
  subTitle: 'test-subTitle',
  mainImage: null,
  mainImageUrl: 'main-image-url',
  content: 'test-content',
  tags: [{ name: 'testtag' }, { name: 'testtag1' }],
  createdDate: new Date()
}
