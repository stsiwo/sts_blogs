import { TagType } from "../../src/domain/tag/TagType";
import * as faker from 'faker';

export const getTagTestData = (num: number = 10): TagType[] => {

  var tagList: TagType[] = []

  for(var i = 1; i <= num; i++) {
    tagList.push({
      id: i.toString(),
      name: faker.lorem.word()
    })
  }

  return tagList
}
