import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { CssGlobalContextDefaultState } from "Contexts/CssGlobalContext/CssGlobalContextDefaultState";
import { ContextWrapperComponent } from "../fixtures";
import Header from 'ui/Header/Header';


describe('h-c1: Header Component testing', () => {

  /**
   * prerequisite (condition)
   * N/A 
   **/

  /**
   * use case or css layout test list
   *
   * ** all **
   *
   * a1. (Route) title link should have link to Home ('/') 
   *
   * ** <= laptop screen
   *
   * ltle1. (component) should render MenuToggleIcon
   * ltle2. (EH) should open menu nav bar 
   *
   * ** > laptop screen
   *
   * gtl1. (component) should not render MenuToggleIcon
   *
   **/

  beforeAll(() => {
  })

  beforeEach(() => {
  })

  /** test for use case which does not matter screen size  here**/
  test('a1. (validation) should display error msg when user name is null/empty', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Header} isAuth />
      )
      const titleLink = await waitForElement(() => getByRole('title-link'))
      expect(titleLink.getAttribute('href')).toBe('/')
    })
  })

  describe('<= laptop screen', () => {

    beforeAll(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.tabletSize })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
    })

    test('ltle1. (component) should render MenuToggleIcon', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
          <ContextWrapperComponent component={Header} isAuth />
        )
        await wait(() => {
          expect(getByRole("menu-toggle-icon")).toBeInTheDocument()
        })
      })
    })

    test('ltle2. (EH) should open menu nav bar', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
          <ContextWrapperComponent component={Header} isAuth />
        )
        const menuToggleIcon = await waitForElement(() => getByRole('menu-toggle-icon'))
        menuToggleIcon.click()
        await wait(() => {
          expect(getByRole('menu').style.width).toBe('100%')
        })
      })
    })

    afterEach(() => {
    })

    afterAll(() => {
    })

    })

    describe('> laptop screen', () => {

    beforeAll(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.laptopSize + 1 })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
    })

    test('gtl1. (component) should not render MenuToggleIcon', async () => {
      await act(async () => {
        const { getByText, getByRole, getAllByRole, debug, getByLabelText, queryByRole } = render(
          <ContextWrapperComponent component={Header} isAuth />
        )
        const titleLink = await waitForElement(() => getByRole('title-link'))
        expect(queryByRole("menu-toggle-icon")).toBeNull()
      })
    })

    afterEach(() => {
    })

    afterAll(() => {
    })

  })

  afterEach(() => {
  })

  afterAll(() => {
  })

})




