import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { api } from "requests/api";
import { CssGlobalContextDefaultState } from "Contexts/CssGlobalContext/CssGlobalContextDefaultState";
import Blog from "ui/Content/Blog/Blog";
import { blogGET200EmptyResponse, blogGET200NonEmptyResponse, singleBlogGET200NonEmptyResponse, networkError, internalServerError500Response } from "../../../requests/fixtures";
import { ContextWrapperComponent } from "../../fixtures";
import '../../../data/mocks/localStorageMock'
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'), // use actual for all non-hook parts
  useParams: () => ({
    blogId: '1',
  }),
}));


describe('bl-c1: Blog Component testing', () => {

  /**
   * prerequisite 
   * 1. mock api request and return dummy test blog data 
   * 2. role: member only (provide test auth user)
   **/

  /**
   * use case or css layout test list
   *
   * ** all **
   *
   * a1. (api fetch) should start api request when this component is mounted
   * a2. (DOM) should display blog data in each input field after initial api request 
   * a3. (api fetch) should display "no blog available" when initial fetch failed because of network error 
   * a4. (api fetch) should display "no blog available" when initial fetch failed because of 4xx or 5xx 
   * a5. (cache) should cache specific blog in localStorage 
   *
   **/

  beforeAll(() => {
    console.log('bl-c1: beforeAll ')
  })

  beforeEach(() => {
    console.log('bl-c1: beforeEach ')
    localStorage.clear()
  })

  /** test for use case which does not matter screen size  here**/
  test('a1. (api fetch) should start api request when this component is mounted', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(singleBlogGET200NonEmptyResponse))
    await act(async () => {
      render(
        <ContextWrapperComponent component={Blog} isAuth />
      )
    })
    expect(api.request).toHaveBeenCalled()
  })

  test('a2. (DOM) should display blog data in each input field after initial api request ', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(singleBlogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Blog} isAuth />
      )

      await wait(() => {
        expect(getByRole('blog-title').innerHTML).toBeTruthy()
        expect(getByRole('blog-subtitle').innerHTML).toBeTruthy()
      })
    })
  })

  test('a3. (api fetch) should display "no blog available" when initial fetch failed because of network error', async () => {

    // use mockRejectedValue rather than mockReturnedValue(Promise....)
    api.request = jest.fn().mockRejectedValue(networkError)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Blog} isAuth />
      )
      await wait(() => {
        expect(getByText('sorry.. requested blog is not available now')).toBeInTheDocument()
      })
    })
  })

  test('a4. (api fetch) should display "no blog available" when initial fetch failed because of 4xx or 5xx', async () => {

    // use mockRejectedValue rather than mockReturnedValue(Promise....)
    api.request = jest.fn().mockRejectedValue(internalServerError500Response)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Blog} isAuth />
      )
      await wait(() => {
        expect(getByText('sorry.. requested blog is not available now')).toBeInTheDocument()
      })
    })
  })

  test("a5. (cache) should cache specific blog in localStorage", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(singleBlogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={Blog} isAuth />
      )

      await wait(() => {
        const path = (api.request as any).mock.calls[0][0].url
        expect(localStorage.getItem(path)).not.toBeNull() 
      })
    })

  })

  afterEach(() => {
    console.log('bl-c1: afterEach ')
  })

  afterAll(() => {
    console.log('bl-c1: afterAll ')
  })

})


