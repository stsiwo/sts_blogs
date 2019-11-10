import { UserType } from "../../src/domain/user/UserType";
import * as faker from 'faker';

export const getUserTestData = (num: number = 20, credential: boolean = false): UserType[] => {

  var userList: UserType[] = []

  for(var i = 1; i <= num; i++) {
    userList.push({
      id: i.toString(),
      ...(credential && { email: faker.internet.email() }),
      ...(credential && { password: 'test-password' }),
      ...(credential && { confirm: 'test-password' }),
      name: faker.name.firstName().concat(" ").concat(faker.name.lastName()),
      avatarUrl: faker.image.avatar()
    })
  }

  return userList
}

