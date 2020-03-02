import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { api } from 'requests/api';
import { userGET200Response, internalServerError500Response, networkError } from '../../../requests/fixtures';
import { ContextWrapperComponent } from '../../fixtures';
import Signup from 'ui/Content/Signup/Signup';


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
   * a2. (validation) should not allow to signup when user name is null/empty 
   * a3. (validation) should display error msg when user email is null/empty 
   * a4. (validation) should not allow to signup when user email is null/empty 
   * a5. (validation) should display error msg when user password is null/empty 
   * a6. (validation) should not allow to signup when user password is null/empty 
   * a7. (validation) should display error msg when user confirm is null/empty 
   * a8. (validation) should not allow to signup when user confirm is null/empty 
   * a9. (validation) should display error msg when password and confirm does not match
   * a10. (validation) should not allow to signup when password and confirm does not match
   * a11. (Route) should display element to lead users to login page (login button)
   * a12. (EH) should start signup request when 'signup' is clicked 
   * a13. (DOM) should show 'signup success' message when signup completed 
   * a14. (DOM) should show "signup failure" message when signup failed because of network issue
   * a15. (DOM) should show "signup failure" message when signup failed because of 4xx or 5xx error
   * a16. (EH) should route signup user to home after signup successfully 
   *
   **/

  /**
   * TODO: ADD BEBLOW TEST
   *  - request data test
   *    - e.g., each field
   **/

  // the order of values must match node array
  const seedInputTestValues = (targetNodes: HTMLElement[], values: string[]): void => {
    targetNodes.forEach((node: HTMLElement, index: number) => {
      fireEvent.focus(node)
      fireEvent.change(node, { target: { value: values[index] } })
    })
  }

  beforeAll(() => {
  })

  beforeEach(() => {

  })

  /** test for use case which does not matter screen size  here**/
  test('a1. (validation) should display error msg when user name is null/empty', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const nameInput = await waitForElement(() => getByLabelText('Name'))
      fireEvent.focus(nameInput) // need to focus to enable to display validation error on dom
      fireEvent.change(nameInput, { target: { value: '' } })
      const nameErrorNode = await waitForElement(() => getByText('name is a required field'))
      expect(nameErrorNode).toBeInTheDocument()
    })
  })

  test('a2. (validation) should not allow to signup when user name is null/empty', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const nameInput = await waitForElement(() => getByLabelText('Name'))
      fireEvent.focus(nameInput) // need to focus to enable to display validation error on dom
      fireEvent.change(nameInput, { target: { value: '' } })
      const nameErrorNode = await waitForElement(() => getByText('name is a required field'))
      fireEvent.click(getByRole('signup-btn'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

  test('a3. (validation) should display error msg when user email is null/empty', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const emailInput = await waitForElement(() => getByLabelText('Email'))
      fireEvent.focus(emailInput) // need to focus to enable to display validation error on dom
      fireEvent.change(emailInput, { target: { value: '' } })
      const emailErrorNode = await waitForElement(() => getByText('email is a required field'))
      expect(emailErrorNode).toBeInTheDocument()
    })
  })

  test('a4. (validation) should not allow to signup when user email is null/empty', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const emailInput = await waitForElement(() => getByLabelText('Email'))
      fireEvent.focus(emailInput) // need to focus to enable to display validation error on dom
      fireEvent.change(emailInput, { target: { value: '' } })
      const emailErrorNode = await waitForElement(() => getByText('email is a required field'))
      fireEvent.click(getByRole('signup-btn'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

  test('a5. (validation) should display error msg when user password is null/empty', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const passwordInput = await waitForElement(() => getByLabelText('Password'))
      fireEvent.focus(passwordInput) // need to focus to enable to display validation error on dom
      fireEvent.change(passwordInput, { target: { value: '' } })
      const passwordErrorNode = await waitForElement(() => getByText('password is a required field'))
      expect(passwordErrorNode).toBeInTheDocument()
    })
  })

  test('a6. (validation) should not allow to signup when user password is null/empty', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const passwordInput = await waitForElement(() => getByLabelText('Password'))
      fireEvent.focus(passwordInput) // need to focus to enable to display validation error on dom
      fireEvent.change(passwordInput, { target: { value: '' } })
      const passwordErrorNode = await waitForElement(() => getByText('password is a required field'))
      fireEvent.click(getByRole('signup-btn'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

  test('a7. (validation) should display error msg when user confirm is null/empty', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput, { target: { value: '' } })
      const confirmErrorNode = await waitForElement(() => getByText('confirm is a required field'))
      expect(confirmErrorNode).toBeInTheDocument()
    })
  })

  test('a8. (validation) should not allow to signup when user confirm is null/empty', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput, { target: { value: '' } })
      const confirmErrorNode = await waitForElement(() => getByText('confirm is a required field'))
      fireEvent.click(getByRole('signup-btn'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

  test('a9. (validation) should display error msg when password and confirm does not match', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput, { target: { value: 'match' } })
      const confirmErrorNode = await waitForElement(() => getByText('passwords must match'))
      expect(confirmErrorNode).toBeInTheDocument()
    })
  })

  test('a10. (validation) should not allow to signup when password and confirm does not match', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const confirmInput = await waitForElement(() => getByLabelText('Confirm'))
      fireEvent.focus(confirmInput) // need to focus to enable to display validation error on dom
      fireEvent.change(confirmInput, { target: { value: 'match' } })
      const confirmErrorNode = await waitForElement(() => getByText('passwords must match'))
      fireEvent.click(getByRole('signup-btn'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

  test('a11. (Route) should display element to lead users to login page (login button)', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} />
      )
      const loginNode = await waitForElement(() => getByText('Login Page'))
      expect(loginNode.getAttribute('href')).toBe('/login')
    })
  })

  test('a12. (EH) should start signup request when "signup" is clicked', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Name'),
        getByLabelText('Email'),
        getByLabelText('Password'),
        getByLabelText('Confirm'),
      ])

      seedInputTestValues(inputs, [
        'test-user',
        'test@test.com',
        'test-password',
        'test-password'
      ])

      fireEvent.click(getByRole('signup-btn'))
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(1)
      })
    })
  })

  test('a13. (DOM) should show "signup success" message when signup completed', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Name'),
        getByLabelText('Email'),
        getByLabelText('Password'),
        getByLabelText('Confirm'),
      ])

      seedInputTestValues(inputs, [
        'test-user',
        'test@test.com',
        'test-password',
        'test-password'
      ])

      fireEvent.click(getByRole('signup-btn'))
      // wait for expectation meet otherwise async timeout
      await wait(() => {
        expect(getByText('requesting user signup success')).toBeInTheDocument()
      })
    })
  })

  test('a14. (DOM) should show "signup failure" message when signup failed because of network issue', async () => {
    api.request = jest.fn().mockReturnValue(Promise.reject(networkError))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Name'),
        getByLabelText('Email'),
        getByLabelText('Password'),
        getByLabelText('Confirm'),
      ])

      seedInputTestValues(inputs, [
        'test-user',
        'test@test.com',
        'test-password',
        'test-password'
      ])

      fireEvent.click(getByRole('signup-btn'))
      // wait for expectation meet otherwise async timeout
      await wait(() => {
        expect(getByText('requesting user signup failed')).toBeInTheDocument()
      })
    })
  })

  test('a15. (DOM) should show "signup failure" message when signup failed because of 4xx or 5xx error', async () => {
    api.request = jest.fn().mockReturnValue(Promise.reject(internalServerError500Response))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Signup} isAuth />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Name'),
        getByLabelText('Email'),
        getByLabelText('Password'),
        getByLabelText('Confirm'),
      ])

      seedInputTestValues(inputs, [
        'test-user',
        'test@test.com',
        'test-password',
        'test-password'
      ])

      fireEvent.click(getByRole('signup-btn'))
      // wait for expectation meet otherwise async timeout
      await wait(() => {
        expect(getByText('requesting user signup failed')).toBeInTheDocument()
      })
    })
  })

  afterEach(() => {
  })

  afterAll(() => {
  })

  /** 
   * how to check 'props.history.push' is called??
   * tmply comment out 
   **/
  //test('a16. (EH) should route signup user to home after signup successfully', async () => {
  //  api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
  //  await act(async () => {
  //    const { getByText, getByRole, getAllByRole, debug, getByLabelText, container } = render(
  //      <ContextWrapperComponent component={Signup} />
  //    )
  //    const inputs = await waitForElement(() => [
  //      getByLabelText('Name'),
  //      getByLabelText('Email'),
  //      getByLabelText('Password'),
  //      getByLabelText('Confirm'),
  //    ])

  //    seedInputTestValues(inputs, [
  //      'test-user',
  //      'test@test.com',
  //      'test-password',
  //      'test-password'
  //    ])


  //    fireEvent.click(getByRole('signup-btn'))
  //    // wait for expectation meet otherwise async timeout
  //    await wait(() => {
  //      expect(getByRole('slogan')).toBeInTheDocument()
  //    })
  //  })
  //})
})



