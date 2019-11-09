import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { api } from '../../../../../src/requests/api';
import { blogGET200NonEmptyResponse, blogGET200EmptyResponse, userGET200Response } from '../../../../requests/fixtures';
import { ContextWrapperComponent } from '../../../fixtures';
import Profile from '../../../../../src/UI/Content/Setting/Profile/Profile';
import { CssGlobalContextDefaultState } from '../../../../../src/UI/Base/Context/CssGlobalContext/CssGlobalContextDefaultState';
jest.mock('../../../../../src/requests/api')


describe('bm-c1: Profile Component testing', () => {

  /**
   * prerequisite 
   * 1. mock api request and return dummy test user data 
   * 2. role: member only 
   **/

  /**
   * use case or css layout test list
   *
   * ** all **
   *
   * a1. (api fetch) should start api request when this component is mounted
   * a2. (DOM) should display user data in each input field after initial api request 
   * a3. (api fetch) should not start api request when this component is updated
   * a4. (validation) should not allow to update when user name is null/empty 
   * a5. (validation) should not allow to update when email is null/empty 
   * a6. (validation) should not allow to update when password is null/empty 
   * a7. (validation) should not allow to update when confirm is null/empty 
   * a8. (EH) should start update request when 'update' is clicked 
   * a9. (DOM) should show 'update success' message when update completed 
   * a10. (DOM) should show 'update failure' message when update failed 
   *
   **/

  beforeAll(() => {
    console.log('bm-c1: beforeAll ')
  })

  beforeEach(() => {
    console.log('bm-c1: beforeEach ')
  })

  /** test for use case which does not matter screen size  here**/
  test('a1. (api fetch) should start api request when this component is mounted', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
    })
    expect(api.request).toHaveBeenCalled()
  })

  test('a2. (DOM) should display user data in each input field after initial api request ', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )

      await wait(() => {
        expect(getByLabelText('Name:').getAttribute('value')).toBeTruthy()
      })
    })
  })

  test('a3. (api fetch) should not start api request when this component is updated', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
      const nameInput = await waitForElement(() => getByLabelText('Name:'))
      fireEvent.change(nameInput,
        {
          target: {
            value: 'test'
          }
        })
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(1)
      })
    })
  })

  test('a4. (validation) should not allow to update when user name is null/empty', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
      const nameInput = await waitForElement(() => getByLabelText('Name:'))
      debug()
      fireEvent.change(nameInput,
        {
          target: {
            value: ''
          }
        })
      await wait(() => {

      })
    })
  })

  afterEach(() => {
    console.log('bm-c1: afterEach ')
  })

  afterAll(() => {
    console.log('bm-c1: afterAll ')
  })

})



