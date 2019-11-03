import { QueryStringType } from "../src/requests/types";
import { buildQueryString } from "../src/utils";

describe('utils testing', () => {

  test('buildQueryString function', () => {
    const dummy: QueryStringType = {
      param1: 'param1',
      date: new Date().toJSON(),
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
})
