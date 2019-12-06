import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { CssGlobalContextDefaultState } from "Contexts/CssGlobalContext/CssGlobalContextDefaultState";
import { ContextWrapperComponent } from "../../fixtures";
import Content from 'ui/Content/Content'


describe('h-c1: Setting Component testing', () => {

  /**
   * prerequisite (condition)
   * N/A 
   **/

  /**
   * use case or css layout test list
   *
   * ** all **
   *
   * a1. (Route) Profile link should have link to Home ('/setting/profile') 
   * a2. (Route) Blog Management link should have link to Home ('/setting/blogs') 
   *
   * ** <= laptop screen
   *
   *
   * ** > laptop screen
   *
   *
   **/

  beforeAll(() => {
    console.log('h-c1: beforeAll ')
  })

  beforeEach(() => {
    console.log('h-c1: beforeEach ')

  })

  /** test for use case which does not matter screen size  here**/
  test('a1. (Route) Profile link should have link to Home ("/setting/profile")', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Content} isAuth initialRoute='/setting'/>
      )
      const profileLink = await waitForElement(() => getByRole('profile-link'))
      expect(profileLink.getAttribute('href')).toBe('/setting/profile')
    })
  })

  test('a2. (Route) Blog Management link should have link to Home (/setting/blogs)', async () => {
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Content} isAuth initialRoute='/setting'/>
      )
      const blogManagementLink = await waitForElement(() => getByRole('blogs-link'))
      expect(blogManagementLink.getAttribute('href')).toBe('/setting/blogs')
    })
  })

  describe('<= laptop screen', () => {

    beforeAll(() => {
      console.log('h-c1: beforeAll: <= laptop screen')
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.tabletSize })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
      console.log('h-c1: beforeEach: <= laptop screen')

    })

    afterEach(() => {
      console.log('h-c1: afterEach: <= laptop screen ')
    })

    afterAll(() => {
        console.log('h-c1: afterAll; <= laptop screen ')
      })

    })

    describe('> laptop screen', () => {

    beforeAll(() => {
      console.log('h-c1: beforeAll: > laptop screen')
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.laptopSize + 1 })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
      console.log('h-c1: beforeEach: > laptop screen')

    })

    afterEach(() => {
      console.log('h-c1: afterEach: > laptop screen ')
    })

    afterAll(() => {
      console.log('h-c1: afterAll; > laptop screen ')
    })

  })

  afterEach(() => {
    console.log('h-c1: afterEach ')
  })

  afterAll(() => {
    console.log('h-c1: afterAll ')
  })

})





