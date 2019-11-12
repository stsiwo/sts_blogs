import { QueryStringType } from "../src/requests/types";
import { buildQueryString } from "../src/utils";

describe('utils testing', () => {

  test('buildQueryString function', () => {
    const dummy: QueryStringType = {
      param1: 'param1',
      param2: null,
      param3: undefined,
      param5: 0,
      param4: '',
      date: new Date().toJSON(),
      emptyArray: [],
      emptyString: '',
      tags: [
        'test1',
        'test2',
        'test3',
        'test4',
      ],
    }

    expect(buildQueryString(dummy)).toBe('?param1=param1&param2=2&param3=3')
  })

  test('Date object test', () => {
    const date = new Date()
    console.log(date.toJSON())
  })

  test('Array is empty', () => {
    const array = []
    expect(array.length != 0).toBeFalsy()
  })

  const testPromise = (is: boolean): Promise<any> => {
    return new Promise((res, rej) => {
      if (is) res(1)
      else rej(0)
    })
      .then((data) => {
        console.log('1st then')
        console.log(data)
        return Promise.resolve(data)
      })
      .catch((error) => {
        console.log('at 1st catch')
        console.log(error)
      })
      .then((data) => {
        console.log('then ater catch')
        return Promise.resolve('yes')
      })
  }

  test('test promise', async () => {

    console.log(await testPromise(false))

  })
})
