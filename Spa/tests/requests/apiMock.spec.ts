import { api } from '../../src/requests/api'
import { printBody } from '../utils';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { blogGET200NonEmptyResponse, blogGET500Response } from './fixtures';
jest.mock('../../src/requests/api')

api.get = jest.fn().mockReturnValue(Promise.resolve(blogGET500Response))



describe('am-1: request mock testing', () => {

  beforeAll(() => {
    console.log('am-1: beforeAll ')
  })

  beforeEach(() => {
    console.log('am-1: beforeEach ')
  })

  /** test for use case which does not matter screen size  here**/
  test('mocking test', async () => {
    const response = await api.get('/test')
    console.log(response)
  })

  afterEach(() => {
    console.log('am-1: afterEach ')
  })

  afterAll(() => {
    console.log('am-1: afterAll ')
  })

})

