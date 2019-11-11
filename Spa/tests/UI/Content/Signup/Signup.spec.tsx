import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { api } from '../../../../src/requests/api';
import { userGET200Response } from '../../../requests/fixtures';
import { ContextWrapperComponent } from '../../fixtures';
import Signup from '../../../../src/UI/Content/Signup/Signup';
jest.mock('../../../../../src/requests/api')


describe('bm-c1: Signup Component testing', () => {

  /**
   * prerequisite (condition)
   * 1. role: guest only 
   **/

  /**
   * use case or css layout test list
   *
   * ** all **
   *
   * a1. (validation) should display error msg when user name is null/empty 
   * a2. (validation) should not allow to update when user name is null/empty 
   * a3. (validation) should display error msg when user email is null/empty 
   * a4. (validation) should not allow to update when user email is null/empty 
   * a5. (validation) should display error msg when user password is null/empty 
   * a6. (validation) should not allow to update when user password is null/empty 
   * a7. (validation) should display error msg when user confirm is null/empty 
   * a8. (validation) should not allow to update when user confirm is null/empty 
   * a9. (validation) should display error msg when password and confirm does not match
   * a10. (validation) should not allow to update when password and confirm does not match
   * a11. (Route) should display element to lead users to login page (login button)
   * a12. (Route) should display element to lead users to login page (login button)
   * a14. (EH) should start signup request when 'signup' is clicked 
   * a15. (DOM) should show 'signup success' message when signup completed 
   * a16. a16. (DOM) should show "signup failure" message when signup failed because of network issue or 4xx or 5xx error
   *
   **/

  beforeAll(() => {
    console.log('bm-c1: beforeAll ')
  })

  beforeEach(() => {
    console.log('bm-c1: beforeEach ')

  })

  /** test for use case which does not matter screen size  here**/
  test('a1. (validation) should display error msg when user name is null/empty', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const nameInput = await waitForElement(() => getByLabelText('Name:'))
      fireEvent.focus(nameInput) // need to focus to enable to display validation error on dom
      fireEvent.change(nameInput, { target: { value: '' } })
      const nameErrorNode = await waitForElement(() => getByText('name is a required field'))
      expect(nameErrorNode).toBeInTheDocument()
    })
  })

  test('a2. (validation) should not allow to update when user name is null/empty', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const nameInput = await waitForElement(() => getByLabelText('Name:'))
      fireEvent.focus(nameInput) // need to focus to enable to display validation error on dom
      fireEvent.change(nameInput, { target: { value: '' } })
      const nameErrorNode = await waitForElement(() => getByText('name is a required field'))
      fireEvent.click(getByText('Update'))
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(1)
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



