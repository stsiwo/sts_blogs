import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { api } from 'requests/api';
import { userGET200Response, internalServerError500Response, networkError, notFound404ResponseV2, invalidToken400Response, expiredToken400Response } from '../../../requests/fixtures';
import { ContextWrapperComponent } from '../../fixtures';
import ResetPassword from 'ui/Content/ResetPassword/ResetPassword';
import ForgotPasswordEmailModal from 'Components/ForgotPasswordEmailModal/ForgotPasswordEmailModal';


describe('l-c1: ResetPassword Component testing', () => {

  /**
   * prerequisite (condition)
   * 1. role: guest only 
   **/

  /**
   * use case or css layout test list
   *
   * ** all **
   *
   * a1. (validation) should display error msg when user password is null/empty 
   * a2. (validation) should not allow to resetpassword when user password is null/empty 
   * a3. (validation) should display error msg when user confirm is null/empty 
   * a4. (validation) should not allow to resetpassword when user confirm is null/empty 
   * a5. (validation) should display error msg when password and confirm does not match
   * a6. (validation) should not allow to resetpassword when password and confirm does not match
   * a7. (Route) should display element to lead users to login page (login button)
   * a8. (DOM) should show 'resetpassword success' message when resetpassword completed 
   * a9. (DOM) should show "resetpassword failure" message when resetpassword failed because of network issue
   * a10. (DOM) should show "resetpassword failure" message when resetpassword failed because of 500 server internal error 
   * a11. (DOM) should show "resetpassword failure" message when resetpassword failed because of invalid (tampered) token 
   * a12. (DOM) should show "resetpassword failure" message when resetpassword failed because of expired token 
   *
   **/

  beforeAll(() => {
  })

  beforeEach(() => {

  })

  /** test for use case which does not matter screen size  here**/
  test('a1. (validation) should display error msg when user password is null/empty', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={ResetPassword} />
      )
      const passwordInput = await waitForElement(() => getByLabelText('Password'))
      fireEvent.focus(passwordInput) // need to focus to enable to display validation error on dom
      fireEvent.change(passwordInput, { target: { value: '' } })
      const passwordErrorNode = await waitForElement(() => getByText('password is a required field'))
      expect(passwordErrorNode).toBeInTheDocument()
    })
  })

  test('a2. (validation) should not allow to resetpassword when user password is null/empty', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={ResetPassword} />
      )
      const passwordInput = await waitForElement(() => getByLabelText('Password'))
      fireEvent.focus(passwordInput) // need to focus to enable to display validation error on dom
      fireEvent.change(passwordInput, { target: { value: '' } })
      const passwordErrorNode = await waitForElement(() => getByText('password is a required field'))
      fireEvent.click(getByRole('reset-password-btn'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

  test('a3. (validation) should display error msg when user confirm is null/empty', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={ResetPassword} />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput, { target: { value: '' } })
      const confirmErrorNode = await waitForElement(() => getByText('confirm is a required field'))
      expect(confirmErrorNode).toBeInTheDocument()
    })
  })

  test('a4. (validation) should not allow to resetpassword when user confirm is null/empty', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={ResetPassword} />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput, { target: { value: '' } })
      const confirmErrorNode = await waitForElement(() => getByText('confirm is a required field'))
      fireEvent.click(getByRole('reset-password-btn'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

  test('a5. (validation) should display error msg when password and confirm does not match', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={ResetPassword} />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput, { target: { value: 'match' } })
      const confirmErrorNode = await waitForElement(() => getByText('passwords must match'))
      expect(confirmErrorNode).toBeInTheDocument()
    })
  })

  test('a6. (validation) should not allow to reset password when password and confirm does not match', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={ResetPassword} />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput, { target: { value: 'match' } })
      const confirmErrorNode = await waitForElement(() => getByText('passwords must match'))
      fireEvent.click(getByRole('reset-password-btn'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

  test('a7. (Route) should display element to lead users to login page (login button)', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={ResetPassword} />
      )
      const resetpasswordNode = await waitForElement(() => getByText('Login Page'))
      expect(resetpasswordNode.getAttribute('href')).toBe('/login')
    })
  })

  // the order of values must match node array
  const seedInputTestValues = (targetNodes: HTMLElement[], values: string[]): void => {
    targetNodes.forEach((node: HTMLElement, index: number) => {
      fireEvent.focus(node)
      fireEvent.change(node, { target: { value: values[index] } })
    })
  }

  test('a8. (DOM) should show "reset password success" message when resetpassword completed', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={ResetPassword} />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Password'),
        getByLabelText('Confirm'),
      ])

      seedInputTestValues(inputs, [
        'test-password',
        'test-password'
      ])

      fireEvent.click(getByRole('reset-password-btn'))
      // wait for expectation meet otherwise async timeout
      await wait(() => {
        expect(getByText('requesting reset password success')).toBeInTheDocument()
      })
    })
  })

  test('a9. (DOM) should show "resetpassword failure" message when reset password failed because of network issue', async () => {
    api.request = jest.fn().mockReturnValue(Promise.reject(networkError))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={ResetPassword} />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Password'),
        getByLabelText('Confirm'),
      ])

      seedInputTestValues(inputs, [
        'test-password',
        'test-password'
      ])

      fireEvent.click(getByRole('reset-password-btn'))
      // wait for expectation meet otherwise async timeout
      await wait(() => {
        expect(getByText('requesting reset password failed')).toBeInTheDocument()
      })
    })
  })

  test('a10. (DOM) should show "resetpassword failure" message when resetpassword failed because of 500 server internal error', async () => {
    api.request = jest.fn().mockReturnValue(Promise.reject(internalServerError500Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={ResetPassword} />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Password'),
        getByLabelText('Confirm'),
      ])

      seedInputTestValues(inputs, [
        'test-password',
        'test-password'
      ])

      fireEvent.click(getByRole('reset-password-btn'))
      // wait for expectation meet otherwise async timeout
      await wait(() => {
        expect(getByText('internal server error message')).toBeInTheDocument()
      })
    })
  })

  test('a11. (DOM) should show "resetpassword failure" message when resetpassword failed because of invalid (tampered) token', async () => {
    api.request = jest.fn().mockReturnValue(Promise.reject(invalidToken400Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={ForgotPasswordEmailModal} />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Email'),
      ])

      seedInputTestValues(inputs, [
        'test@test.com',
      ])

      fireEvent.click(getByRole('forgot-password-btn'))
      // wait for expectation meet otherwise async timeout
      await wait(() => {
        expect(getByText('token is invalid. it seems wrong type. please start over again.')).toBeInTheDocument()
      })
    })
  })

  test('a12. (DOM) should show "resetpassword failure" message when resetpassword failed because of expired token', async () => {
    api.request = jest.fn().mockReturnValue(Promise.reject(expiredToken400Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={ForgotPasswordEmailModal} />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Email'),
      ])

      seedInputTestValues(inputs, [
        'test@test.com',
      ])

      fireEvent.click(getByRole('forgot-password-btn'))
      // wait for expectation meet otherwise async timeout
      await wait(() => {
        expect(getByText('reset password token is exipred. please start over again.')).toBeInTheDocument()
      })
    })
  })
  afterEach(() => {
  })

  afterAll(() => {
  })

})




