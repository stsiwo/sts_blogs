import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { CssGlobalContextDefaultState } from "Contexts/CssGlobalContext/CssGlobalContextDefaultState";
import { ContextWrapperComponent } from "../../fixtures";
import Header from 'ui/Header/Header';


describe('m-c1: Header Component testing', () => {

  /**
   * prerequisite (condition)
   * N/A 
   **/

  /**
   * use case or css layout test list
   *
   * ** all **
   *
   *
   * ** <= laptop screen
   *
   *
   * ** > laptop screen
   *
   * gtl1. (auth:member) should display dedicated menu item (Account)  
   * gtl2. (auth:member) should not display gust menu item (Signup)  
   * gtl3. (auth:guest) should display menu item (Signup)  
   * gtl4. (auth:guest) should not display menu item (Account)  
   * gtl5. (Route) Blogs menu should route /blogs 
   * gtl6. (auth:member:Route) Account menu should route /setting/profile
   * gtl7. (auth:member:Route) Logout menu should route /
   * gtl8. (auth:guest:Route) Signup menu should route /signup
   * gtl9. (auth:guest:Route) Login menu should route /login
   * gtl10. (EH) should display guest menu (Signup) when user logout 
   * gtl11. (component) should not render menu-close-icon
   *
   **/

  beforeAll(() => {
    console.log('m-c1: beforeAll ')
  })

  beforeEach(() => {
    console.log('m-c1: beforeEach ')

  })

  describe('<= laptop screen', () => {

    beforeAll(() => {
      console.log('m-c1: beforeAll: <= laptop screen')
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.tabletSize })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
      console.log('m-c1: beforeEach: <= laptop screen')

    })

    afterEach(() => {
      console.log('m-c1: afterEach: <= laptop screen ')
    })

    afterAll(() => {
      console.log('m-c1: afterAll; <= laptop screen ')
    })

  })

  describe('> laptop screen', () => {

    beforeAll(() => {
      console.log('m-c1: beforeAll: > laptop screen')
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.laptopSize + 1 })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
      console.log('m-c1: beforeEach: > laptop screen')

    })

    test('gtl1. (auth:member) should display dedicated menu item (Account)', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
          <ContextWrapperComponent component={Header} isAuth />
        )
        await wait(() => {
          expect(getByText('Account')).toBeInTheDocument()
        })
      })
    })

    test('gtl2. (auth:member) should not display gust menu item (Signup)', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText, container } = render(
          <ContextWrapperComponent component={Header} isAuth />
        )
        await waitForElement(() => getByRole("menu"))
        expect(queryByText(container, 'Signup')).toBeNull()
      })
    })

    test('gtl3. (auth:guest) should display menu item (Signup)', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
          <ContextWrapperComponent component={Header} />
        )
        await wait(() => {
          expect(getByText('Signup')).toBeInTheDocument()
        })
      })
    })

    test('gtl4. (auth:guest) should not display menu item (Account)', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText, container } = render(
          <ContextWrapperComponent component={Header} />
        )
        await waitForElement(() => getByRole("menu"))
        expect(queryByText(container, 'Account')).toBeNull()
      })
    })

    test('gtl5. (Route) Blogs menu should route /blogs', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
          <ContextWrapperComponent component={Header} isAuth />
        )
        await wait(() => {
          expect(getByText('Blogs').getAttribute('href')).toBe('/blogs')
        })
      })
    })

    test('gtl6. (auth:member:Route) Account menu should route /setting/profile', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
          <ContextWrapperComponent component={Header} isAuth />
        )
        await wait(() => {
          expect(getByText('Account').getAttribute('href')).toBe('/setting/profile')
        })
      })
    })

    test('gtl7. (auth:member:Route) Logout menu should route /', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
          <ContextWrapperComponent component={Header} isAuth />
        )
        await wait(() => {
          expect(getByText('Logout').getAttribute('href')).toBe('/')
        })
      })
    })

    test('gtl8. (auth:guest:Route) Signup menu should route /signup', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
          <ContextWrapperComponent component={Header} />
        )
        await wait(() => {
          expect(getByText('Signup').getAttribute('href')).toBe('/signup')
        })
      })
    })

    test('gtl9. (auth:guest:Route) Login menu should route /login', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
          <ContextWrapperComponent component={Header} />
        )
        await wait(() => {
          expect(getByText('Login').getAttribute('href')).toBe('/login')
        })
      })
    })

    test('gtl10. (EH) should display guest menu (Signup) when user logout', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
          <ContextWrapperComponent component={Header} isAuth />
        )
        const logoutMenuItem = await waitForElement(() => getByText('Logout'))
        logoutMenuItem.click()
        await wait(() => {
          expect(getByText("Signup")).toBeInTheDocument()
        })
      })
    })

    test('gtl11. (component) should not render menu-close-icon', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText, queryByRole } = render(
          <ContextWrapperComponent component={Header} isAuth />
        )
        const titleLink = await waitForElement(() => getByRole('menu'))
        expect(queryByRole("menu-close-icon")).toBeNull()
      })
    })

    afterEach(() => {
      console.log('m-c1: afterEach: > laptop screen ')
    })

    afterAll(() => {
      console.log('m-c1: afterAll; > laptop screen ')
    })

  })

  afterEach(() => {
    console.log('m-c1: afterEach ')
  })

  afterAll(() => {
    console.log('m-c1: afterAll ')
  })

})





