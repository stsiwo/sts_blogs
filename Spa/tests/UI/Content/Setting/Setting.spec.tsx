import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { CssGlobalContextDefaultState } from "Contexts/CssGlobalContext/CssGlobalContextDefaultState";
import { ContextWrapperComponent } from "../../fixtures";
import Content from 'ui/Content/Content'
import { api } from 'requests/api';
import { userGET200Response } from '../../..//requests/fixtures';


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
  })

  beforeEach(() => {
  })

  /** test for use case which does not matter screen size  here**/
  test('a1. (Route) Profile link should have link to Home ("/setting/profile")', async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(userGET200Response))
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
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.tabletSize })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {

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





