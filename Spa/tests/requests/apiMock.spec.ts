import { api } from 'requests/api'
import { printBody } from '../utils';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { blogGET200NonEmptyResponse, blogGET500Response } from './fixtures';
jest.mock('requests/api')

api.get = jest.fn().mockReturnValue(Promise.resolve(blogGET500Response))



describe('am-1: request mock testing', () => {

  beforeAll(() => {
  })

  beforeEach(() => {
  })

  /** test for use case which does not matter screen size  here**/
  test('mocking test', async () => {
    const response = await api.get('/test')
  })

  afterEach(() => {
  })

  afterAll(() => {
  })

})

