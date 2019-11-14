import { BlogType } from "domain/blog/BlogType";
import * as faker from 'faker';

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
      tags: new Array(tagNum).fill(null).map((ele: string) => ({ name: faker.random.word()}))
    })
  }

  return blogList
}
