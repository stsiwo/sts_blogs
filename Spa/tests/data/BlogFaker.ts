import { BlogType } from "../../src/domain/blog/BlogType";
import * as faker from 'faker';

export const getBlogTestData = (num: number = 20): BlogType[] => {

  var blogList: BlogType[] = []

  for(var i = 1; i <= num; i++) {
    blogList.push({
      id: i.toString(),
      title: faker.lorem.sentence(20),
      subTitle: faker.lorem.sentences(),
      content: faker.lorem.paragraphs(10),
      createdDate: faker.date.past(),
    })
  }

  return blogList
}
