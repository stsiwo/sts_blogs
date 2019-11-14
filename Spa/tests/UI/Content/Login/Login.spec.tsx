import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { api } from 'requests/api';
import { userGET200Response, internalServerError500Response, networkError } from '../../../requests/fixtures';
import { ContextWrapperComponent } from '../../fixtures';
import Login from 'ui/Content/Login/Login';


describe('l-c1: Login Component testing', () => {

  /**
   * prerequisite (condition)
   * 1. role: guest only 
   **/

  /**
   * use case or css layout test list
   *
   * ** all **
   *
   * a3. (validation) should display error msg when user email is null/empty 
   * a4. (validation) should not allow to login when user email is null/empty 
   * a5. (validation) should display error msg when user password is null/empty 
   * a6. (validation) should not allow to login when user password is null/empty 
   * a7. (validation) should display error msg when user confirm is null/empty 
   * a8. (validation) should not allow to login when user confirm is null/empty 
   * a9. (validation) should display error msg when password and confirm does not match
   * a10. (validation) should not allow to login when password and confirm does not match
   * a11. (Route) should display element to lead users to signup page (signup button)
   * a12. (EH) should start login request when 'login' is clicked 
   * a13. (DOM) should show 'login success' message when login completed 
   * a14. (DOM) should show "login failure" message when login failed because of network issue
   * a15. (DOM) should show "login failure" message when login failed because of 4xx or 5xx error
   *
   **/

  beforeAll(() => {
    console.log('l-c1: beforeAll ')
  })

  beforeEach(() => {
    console.log('l-c1: beforeEach ')

  })

  /** test for use case which does not matter screen size  here**/
  test('a3. (validation) should display error msg when user email is null/empty', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Login} isAuth />
      )
      const emailInput = await waitForElement(() => getByLabelText('Email'))
      fireEvent.focus(emailInput) // need to focus to enable to display validation error on dom
      fireEvent.change(emailInput, { target: { value: '' } })
      const emailErrorNode = await waitForElement(() => getByText('email is a required field'))
      expect(emailErrorNode).toBeInTheDocument()
    })
  })

  test('a4. (validation) should not allow to login when user email is null/empty', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Login} isAuth />
      )
      const emailInput = await waitForElement(() => getByLabelText('Email'))
      fireEvent.focus(emailInput) // need to focus to enable to display validation error on dom
      fireEvent.change(emailInput, { target: { value: '' } })
      const emailErrorNode = await waitForElement(() => getByText('email is a required field'))
      fireEvent.click(getByText('Login'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

  test('a5. (validation) should display error msg when user password is null/empty', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Login} isAuth />
      )
      const passwordInput = await waitForElement(() => getByLabelText('Password'))
      fireEvent.focus(passwordInput) // need to focus to enable to display validation error on dom
      fireEvent.change(passwordInput, { target: { value: '' } })
      const passwordErrorNode = await waitForElement(() => getByText('password is a required field'))
      expect(passwordErrorNode).toBeInTheDocument()
    })
  })

  test('a6. (validation) should not allow to login when user password is null/empty', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Login} isAuth />
      )
      const passwordInput = await waitForElement(() => getByLabelText('Password'))
      fireEvent.focus(passwordInput) // need to focus to enable to display validation error on dom
      fireEvent.change(passwordInput, { target: { value: '' } })
      const passwordErrorNode = await waitForElement(() => getByText('password is a required field'))
      fireEvent.click(getByText('Login'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

  test('a7. (validation) should display error msg when user confirm is null/empty', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Login} isAuth />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Password Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput, { target: { value: '' } })
      const confirmErrorNode = await waitForElement(() => getByText('confirm is a required field'))
      expect(confirmErrorNode).toBeInTheDocument()
    })
  })

  test('a8. (validation) should not allow to login when user confirm is null/empty', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Login} isAuth />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Password Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput, { target: { value: '' } })
      const confirmErrorNode = await waitForElement(() => getByText('confirm is a required field'))
      fireEvent.click(getByText('Login'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

  test('a9. (validation) should display error msg when password and confirm does not match', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Login} isAuth />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Password Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput, { target: { value: 'match' } })
      const confirmErrorNode = await waitForElement(() => getByText('passwords must match'))
      expect(confirmErrorNode).toBeInTheDocument()
    })
  })

  test('a10. (validation) should not allow to login when password and confirm does not match', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Login} isAuth />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Password Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput, { target: { value: 'match' } })
      const confirmErrorNode = await waitForElement(() => getByText('passwords must match'))
      fireEvent.click(getByText('Login'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

  test('a11. (Route) should display element to lead users to signup page (signup button)', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Login} />
      )
      const loginNode = await waitForElement(() => getByText('Signup Page'))
      expect(loginNode.getAttribute('href')).toBe('/login')
    })
  })

  // the order of values must match node array
  const seedInputTestValues = (targetNodes: HTMLElement[], values: string[]): void => {
    targetNodes.forEach((node: HTMLElement, index: number) => {
      fireEvent.focus(node)
        fireEvent.change(node, { target: { value: values[index] }}) 
    })
  }

  test('a12. (EH) should start login request when "login" is clicked', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Login} isAuth />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Email'),
        getByLabelText('Password'),
        getByLabelText('Password Confirm'),
      ])

      seedInputTestValues(inputs, [
        'test@test.com',
        'test-password',
        'test-password'
      ])

      fireEvent.click(getByText('Login'))
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(1)
      })
    })
  })

  test('a13. (DOM) should show "login success" message when login completed', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Login} isAuth />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Email'),
        getByLabelText('Password'),
        getByLabelText('Password Confirm'),
      ])

      seedInputTestValues(inputs, [
        'test@test.com',
        'test-password',
        'test-password'
      ])

      fireEvent.click(getByText('Login'))
      // wait for expectation meet otherwise async timeout
      await wait(() => {
        expect(getByText('requesting user login success')).toBeInTheDocument()
      })
    })
  })
  
  test('a15. (DOM) should show "login failure" message when login failed because of 4xx or 5xx error', async () => {
    api.request = jest.fn().mockReturnValue(Promise.reject(internalServerError500Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Login} isAuth />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Email'),
        getByLabelText('Password'),
        getByLabelText('Password Confirm'),
      ])

      seedInputTestValues(inputs, [
        'test@test.com',
        'test-password',
        'test-password'
      ])

      fireEvent.click(getByText('Login'))
      // wait for expectation meet otherwise async timeout
      await wait(() => {
        expect(getByText('requesting user login failed')).toBeInTheDocument()
      })
    })
  })

  test('a14. (DOM) should show "login failure" message when login failed because of network issue', async () => {
    api.request = jest.fn().mockReturnValue(Promise.reject(networkError))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Login} isAuth />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Email'),
        getByLabelText('Password'),
        getByLabelText('Password Confirm'),
      ])

      seedInputTestValues(inputs, [
        'test@test.com',
        'test-password',
        'test-password'
      ])

      fireEvent.click(getByText('Login'))
      // wait for expectation meet otherwise async timeout
      await wait(() => {
        expect(getByText('requesting user login failed')).toBeInTheDocument()
      })
    })
  })
  afterEach(() => {
    console.log('l-c1: afterEach ')
  })

  afterAll(() => {
    console.log('l-c1: afterAll ')
  })

})




