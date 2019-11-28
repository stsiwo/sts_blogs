import { BlogType } from "domain/blog/BlogType";
import * as faker from 'faker';
import { getUserTestData } from "./UserFaker";
import { AuthorType } from "domain/author/AuthorType";
import { TagType } from "domain/tag/TagType";

export const getBlogTestData = (num: number = 20): BlogType[] => {

  var blogList: BlogType[] = []

  var tagNum: number = faker.random.number(10)

  for(var i = 1; i <= num; i++) {
    blogList.push({
      id: i.toString(),
      title: faker.lorem.sentence(20),
      subtitle: faker.lorem.sentences(),
      content: faker.lorem.paragraphs(10),
      createdDate: faker.date.past(),
      author: getUserTestData(1)[0] as AuthorType, 
      tags: new Set<string>(new Array<string>(tagNum).fill(null).map(() => (faker.random.word())))
    })
  }

  return blogList
}
