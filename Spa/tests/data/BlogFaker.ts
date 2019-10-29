import { BlogType } from "../../src/domain/blog/BlogType";
import * as faker from 'faker';

export const getBlogTestData = (num: number = 20): BlogType[] => {

  var blogList: BlogType[] = []

  for(var i = 1; i <= num; i++) {
    blogList.push({
      id: i.toString(),
      title: faker.name.title(),
      subTitle: faker.name.title(),
      content: faker.lorem.sentences()
    })
  }

  return blogList
}
