import { AuthorType } from "../author/AuthorType";
import { TagType } from "../tag/TagType";

export declare type BlogType = {
  id: string,
  title: string, 
  subTitle: string, 
  content: string,
  //author: AuthorType,
  //tags: TagType[],
}

