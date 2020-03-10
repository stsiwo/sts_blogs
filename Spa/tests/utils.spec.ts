import { QueryStringType } from "../src/requests/types";
import { buildQueryString, isSameObjectForm } from "../src/utils";

describe('utils testing', () => {

  test('buildQueryString function', () => {
  
    const date = new Date().toJSON()

    const dummy: QueryStringType = {
      param1: 'param1',
      param2: null,
      param3: undefined,
      param5: 0,
      param4: '',
      date: date,
      emptyArray: [],
      emptyString: '',
      tags: [
        'test1',
        'test2',
        'test3',
        'test4',
      ],
    }

    expect(buildQueryString(dummy)).toBe('?param1=param1&date=' + date + '&tags=test1,test2,test3,test4')
  })

  test('Date object test', () => {
    const date = new Date()
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
        setTimeout(() => Promise.resolve(data), 1000)
      })
  }

  test('isSameObjectForm should return false since two object has different form', async () => {
    const A = {
      a: 1,
      b: 2,
      c: 3,
    }
    const B = {
      a: 1,
      b: 2,
      d: 3
    }

    expect(isSameObjectForm(A, B)).toBeFalsy()
  })

  test('isSameObjectForm should return true since two object has same form', async () => {
    const A = {
      a: 1,
      b: 2,
      c: 3,
    }
    const B = {
      c: 4,
      a: 4,
      b: 4,
    }

    expect(isSameObjectForm(A, B)).toBeTruthy()
  })
})
