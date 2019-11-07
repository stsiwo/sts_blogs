import axios from 'axios'
import { api } from '../../src/requests/api';

describe('r-1: request module testing', () => {

  beforeAll(() => {
    console.log('r-1: beforeAll ')
  })

  beforeEach(() => {
    console.log('r-1: beforeEach ')
  })

  /** test for use case which does not matter screen size  here**/
  test('cancel test', async () => {
    const source = api.CancelToken.source();

    axios.request({
      url: '/test/',
      method: 'get',
      cancelToken: source.token
    }).catch(function(thrown) {
      if (api.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        // handle error
      }
    });

    axios.request({
      url: '/test/1',
      method: 'get',
      cancelToken: source.token
    }).catch(function(thrown) {
      if (api.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        // handle error
      }
    });

    source.cancel('Operation canceled by the user.');

  })

  afterEach(() => {
    console.log('r-1: afterEach ')
  })

  afterAll(() => {
    console.log('r-1: afterAll ')
  })

})


