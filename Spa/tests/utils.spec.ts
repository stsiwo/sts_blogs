import { QueryStringType } from "../src/requests/types";
import { buildQueryString } from "../src/utils";

describe('utils testing', () => {

  test('buildQueryString function', () => {
    const dummy: QueryStringType = {
      param1: 'param1',
      param2: '2',
      param3: '3',
    }

    expect(buildQueryString(dummy)).toBe('?param1=param1&param2=2&param3=3')
  })
})
