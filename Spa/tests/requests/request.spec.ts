import axios, { AxiosResponse } from 'axios'
import { api } from 'requests/api';
import { RequestContentType, RequestMethodEnum, ResponseResultType, ResponseResultStatusEnum, Error401ResponseDataTypeEnum } from 'requests/types';
import { request } from 'requests/request';
import { unauthorized401WithAccessTokenExpiredResponse, unauthorized401WithAtAndRtExpiredResponse, unauthorized401WithNoAtNorRtResponse, unauthorized401WithUnauthorizedRoleResponse, invalidToken422Response, notFound404ResponseV2, networkError } from './fixtures';
const requestModule = require('requests/request')

const dummyResponse: AxiosResponse<any> = {
  data: {
    test: 'test',
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

const dummyRequestContent: RequestContentType = {
  url: '/test',
  method: RequestMethodEnum.GET,
  //headers?: any
  //data?: any
  //cancelToken?: CancelToken
}

const expectedResponseResult: ResponseResultType = {
  data: { test: 'test' },
  status: ResponseResultStatusEnum.SUCCESS,
  //errorMsg?: string 
}

describe('r-1: request module testing', () => {

  beforeAll(() => {
  })

  beforeEach(() => {
  })

  test('r-1.1: request function should resolve promise', async () => {
    api.request = jest.fn().mockResolvedValue(dummyResponse)

    const result: ResponseResultType = await request(dummyRequestContent)

    /**
     * when assert object, use 'toStrictEqual' rather than 'toBe' 
     **/
    expect(result).toStrictEqual(expectedResponseResult)

  })

  describe('r-1.2: request function reject promise', () => {
    describe('r-1.2.1: 4xx/5xx status code error', () => {
      describe('r-1.2.1.1: 401 (UNAUTHORIZED)', () => {
        test('r-1.2.1.1.1: request function should automatically renew access token when it is expired', async () => {
          api.request = jest.fn()
            // original request is rejected because access token is expired
            .mockRejectedValueOnce(unauthorized401WithAccessTokenExpiredResponse)
            // so start request for refresh access token
            .mockResolvedValueOnce(dummyResponse) // refresh request
            // after the success, re-send original request
            .mockResolvedValue(dummyResponse) // original request 

          const requestSpy = jest.spyOn(requestModule, 'request')
          const result: ResponseResultType = await requestModule.request(dummyRequestContent)
            .then((data: ResponseResultType) => {
              return data
            })
            .catch((data: ResponseResultType) => {
            })

          expect(requestSpy).toHaveBeenCalledTimes(2)
          expect(api.request).toHaveBeenCalledTimes(3)
          expect(result).toStrictEqual({
            status: ResponseResultStatusEnum.SUCCESS,
            data: { test: 'test' }
          })
        })

        test('r-1.2.1.1.2: request function should reject promise since access token and refresh token has expired', async () => {
          api.request = jest.fn()
            // original request is rejected because access token is expired
            .mockRejectedValueOnce(unauthorized401WithAccessTokenExpiredResponse)
            // so start request for refresh access token
            .mockRejectedValue(unauthorized401WithAtAndRtExpiredResponse) // refresh request
          // it failed. so return rejected promise with both token have expired 

          const requestSpy = jest.spyOn(requestModule, 'request')
          const result: ResponseResultType = await requestModule.request(dummyRequestContent)
            .then((data: ResponseResultType) => {
            })
            .catch((data: ResponseResultType) => {
              return data
            })

          expect(result).toStrictEqual({
            needLogout: true,
            type: Error401ResponseDataTypeEnum.ACCESS_TOKEN_AND_REFRESH_TOKEN_EXPIRED,
            status: ResponseResultStatusEnum.FAILURE,
            errorMsg: 'both refresh token and access token have expired'
          })
        })

        test('r-1.2.1.1.3: request function should reject promise since none of access nor refresh token exist', async () => {
          api.request = jest.fn()
            // no access token nor refresh token provided 
            .mockRejectedValueOnce(unauthorized401WithNoAtNorRtResponse)

          const requestSpy = jest.spyOn(requestModule, 'request')
          const result: ResponseResultType = await requestModule.request(dummyRequestContent)
            .then((data: ResponseResultType) => {
            })
            .catch((data: ResponseResultType) => {
              return data
            })

          expect(result).toStrictEqual({
            needLogout: true,
            type: Error401ResponseDataTypeEnum.NEITHER_ACCESS_TOKEN_AND_REFRESH_TOKEN_EXIST,
            status: ResponseResultStatusEnum.FAILURE,
            errorMsg: 'no access and refresh token are provided'
          })
        })

        test('r-1.2.1.1.4: request function should reject promise since user try to access different role level', async () => {
          api.request = jest.fn()
            // no access token nor refresh token provided 
            .mockRejectedValueOnce(unauthorized401WithUnauthorizedRoleResponse)

          const requestSpy = jest.spyOn(requestModule, 'request')
          const result: ResponseResultType = await requestModule.request(dummyRequestContent)
            .then((data: ResponseResultType) => {
            })
            .catch((data: ResponseResultType) => {
              return data
            })

          expect(result).toStrictEqual({
            type: Error401ResponseDataTypeEnum.UNAUTHORIZED_ROLE,
            status: ResponseResultStatusEnum.FAILURE,
            errorMsg: 'provided token is not allowed to access/perform requested resource/action'
          })
        })
      })

      describe('r-1.2.1.2: 422 (INVALID_TOKEN)', () => {
        test('r-1.2.1.2.1: request function should reject promise invalid token', async () => {
          api.request = jest.fn()
            // no access token nor refresh token provided 
            .mockRejectedValueOnce(invalidToken422Response)

          const requestSpy = jest.spyOn(requestModule, 'request')
          const result: ResponseResultType = await requestModule.request(dummyRequestContent)
            .then((data: ResponseResultType) => {
            })
            .catch((data: ResponseResultType) => {
              return data
            })

          expect(result).toStrictEqual({
            status: ResponseResultStatusEnum.FAILURE,
            errorMsg: 'provided token is invalid'
          })
        })

      })

      describe('r-1.2.1.3: other status (e.g., 400, 404, ...) (Bad Request, Not Found ...)', () => {
        test('r-1.2.1.3.1: request function should reject promise since other status code', async () => {
          api.request = jest.fn()
            // no access token nor refresh token provided 
            .mockRejectedValueOnce(notFound404ResponseV2)

          const requestSpy = jest.spyOn(requestModule, 'request')
          const result: ResponseResultType = await requestModule.request(dummyRequestContent)
            .then((data: ResponseResultType) => {
            })
            .catch((data: ResponseResultType) => {
              return data
            })

          expect(result).toStrictEqual({
            status: ResponseResultStatusEnum.FAILURE,
            errorMsg: 'not found'
          })
        })

      })
    })
    describe('r-1.2.2: network error', () => {
      test('r-1.2.2.1: request function should reject promise since network error', async () => {
        api.request = jest.fn()
          // no access token nor refresh token provided 
          .mockRejectedValueOnce(networkError)

        const requestSpy = jest.spyOn(requestModule, 'request')
        const result: ResponseResultType = await requestModule.request(dummyRequestContent)
          .then((data: ResponseResultType) => {
          })
          .catch((data: ResponseResultType) => {
            return data
          })

        expect(result).toStrictEqual({
          status: ResponseResultStatusEnum.FAILURE,
          errorMsg: 'network error'
        })
      })
    })
  })


  afterEach(() => {
  })

  afterAll(() => {
  })

})


