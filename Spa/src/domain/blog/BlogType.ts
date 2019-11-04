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

