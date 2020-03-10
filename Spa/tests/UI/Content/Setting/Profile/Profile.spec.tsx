import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { api } from 'requests/api';
import { blogGET200NonEmptyResponse, blogGET200EmptyResponse, userGET200Response, noDateGET200Response, internalServerError500Response, networkError } from '../../../../requests/fixtures';
import { ContextWrapperComponent } from '../../../fixtures';
import Profile from 'ui/Content/Setting/Profile/Profile';
import { CssGlobalContextDefaultState } from 'Contexts/CssGlobalContext/CssGlobalContextDefaultState';


describe('p-c1: Profile Component testing', () => {

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
   * a4. (validation) should display error msg when user name is null/empty 
   * a5. (validation) should not allow to update when user name is null/empty 
   * a6. (validation) should display error msg when email is null/empty 
   * a7. (validation) should not allow to update when email is null/empty 
   * a8. (validation) should display error msg when password and confirm does not match
   * a9. (validation) should not allow to update when password and confirm does not match
   * a10. (EH) should start update request when 'update' is clicked 
   * a11. (DOM) should show 'update success' message when update completed 
   * a12. a16. (DOM) should show "update failure" message when update failed because of network issue or 4xx or 5xx error
   *
   **/

  /**
   * remaining tasks:
   *  - please delete task once you are done and update 'click' project management tool
   *  
   *  - re-implement update profile logic (https://app.clickup.com/t/4ab5pa)
   **/

  beforeAll(() => {
  })

  beforeEach(() => {
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
        expect(getByLabelText('New User Name').getAttribute('value')).toBeTruthy()
      })
    })
  })

  test('a3. (api fetch) should not start api request when this component is updated', async () => {

    api.request = jest.fn().mockResolvedValue(userGET200Response)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
      const nameInput = await waitForElement(() => getByLabelText('New User Name'))
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

  test('a4. (validation) should display error msg when user name is null/empty', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
      const nameInput = await waitForElement(() => getByLabelText('New User Name'))
      fireEvent.focus(nameInput) // need to focus to enable to display validation error on dom
      fireEvent.change(nameInput,{ target: { value: '' }})
      const nameErrorNode = await waitForElement(() => getByText('name is a required field'))
      expect(nameErrorNode).toBeInTheDocument()
    })
  })


  test('a5. (validation) should not allow to update when user name is null/empty', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
      const nameInput = await waitForElement(() => getByLabelText('New User Name'))
      fireEvent.focus(nameInput) // need to focus to enable to display validation error on dom
      fireEvent.change(nameInput,{ target: { value: '' }})
      const nameErrorNode = await waitForElement(() => getByText('name is a required field'))
      fireEvent.click(getByText('Update'))
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(1)
      })
      
    })
  })

  test('a6. (validation) should display error msg when email is null/empty ', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
      const emailInput = await waitForElement(() => getByLabelText('New Email'))
      fireEvent.focus(emailInput) // need to focus to enable to display validation error on dom
      fireEvent.change(emailInput,{ target: { value: '' }})
      const emailErrorNode = await waitForElement(() => getByText('email is a required field'))
      expect(emailErrorNode).toBeInTheDocument()
    })
  })

  test('a7.  (validation) should not allow to update when email is null/empty', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
      const emailInput = await waitForElement(() => getByLabelText('New Email'))
      fireEvent.focus(emailInput) // need to focus to enable to display validation error on dom
      fireEvent.change(emailInput,{ target: { value: '' }})
      const emailErrorNode = await waitForElement(() => getByText('email is a required field'))
      fireEvent.click(getByText('Update'))
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(1)
      })

    })
  })

  test('a8. (validation) should display error msg when password and confirm does not match', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Password Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput,{ target: { value: 'sample' }})
      const confirmErrorNode = await waitForElement(() => getByText('passwords must match'))
      expect(confirmErrorNode).toBeInTheDocument()
    })
  })

  test('a9. (validation) should not allow to update when password and confirm does not match', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Password Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput,{ target: { value: 'sample' }})
      const confirmErrorNode = await waitForElement(() => getByText('passwords must match'))
      fireEvent.click(getByText('Update'))
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(1)
      })
    })
  })

  test('a10. (EH) should start update request when "update" is clicked', async () => {

    api.request = jest.fn().mockResolvedValue(userGET200Response)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
      // must wait until fetch is completed
      const updateBtn = await waitForElement(() => getByText('Update'))
      fireEvent.click(updateBtn)
      // wait until below expectation is met otherwise, timeout
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(2)
      })
    })
  })

  test('a11. (DOM) should show "update success" message when update completed', async () => {

    api.request = jest.fn().mockResolvedValue(userGET200Response)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
      // must wait until fetch is completed
      const updateBtn = await waitForElement(() => getByText('Update'))
      // mock response of update request
      api.request = jest.fn().mockResolvedValue(noDateGET200Response)
      fireEvent.click(updateBtn)
      await wait(() => {
        expect(getByText('updating user profile success')).toBeInTheDocument()
      })
    })
  })

  test('a12. (DOM) should show "update failure" message when update failed because of network issue', async () => {

    api.request = jest.fn().mockResolvedValue(userGET200Response)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
      // must wait until fetch is completed
      const updateBtn = await waitForElement(() => getByText('Update'))
      // mock response of update request
      api.request = jest.fn().mockRejectedValue(networkError)
      fireEvent.click(updateBtn)
      await wait(() => {
        expect(getByText('updating user profile failed')).toBeInTheDocument()
      })
    })
  })
  
  test('a13. (DOM) should show "update failure" message when update failed because of 4xx/5xx error', async () => {

    api.request = jest.fn().mockResolvedValue(userGET200Response)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Profile} isAuth />
      )
      // must wait until fetch is completed
      const updateBtn = await waitForElement(() => getByText('Update'))
      // mock response of update request
      api.request = jest.fn().mockRejectedValue(internalServerError500Response)
      fireEvent.click(updateBtn)
      await wait(() => {
        expect(getByText('updating user profile failed')).toBeInTheDocument()
      })
    })
  })
  afterEach(() => {
  })

  afterAll(() => {
  })

})



