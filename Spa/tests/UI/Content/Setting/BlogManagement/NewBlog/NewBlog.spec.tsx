import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { api } from 'requests/api';
import { blogGET200NonEmptyResponse, blogGET200EmptyResponse, noDateGET200Response, internalServerError500Response, networkError, singleBlogGET200NonEmptyResponse } from '../../../../../requests/fixtures';
import NewBlog from 'ui/Content/Setting/BlogManagement/NewBlog/NewBlog'
import { ContextWrapperComponent } from '../../../../fixtures';
import { CssGlobalContextDefaultState } from 'Contexts/CssGlobalContext/CssGlobalContextDefaultState';


describe('ub-c1: NewBlog Component testing', () => {

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
   * a1. (validation) should display error msg when blog title is null/empty 
   * a2. (validation) should not allow to update when blog title is null/empty 
   * a3. (validation) should display error msg when subtitle is null/empty  
   * a4.  (validation) should not allow to update when subtitle is null/empty 
   * a5. (validation) should display error msg when content is null/empty  
   * a6. (validation) should not allow to update when content is null/empty 
   * a7. (EH) should start save request when "save" is clicked 
   * a8. (DOM) should show "save success" message when save completed 
   * a9. (DOM) should show "save failure" message when save failed because of network issue 
   * a10. (DOM) should show "save failure" message when save failed because of 4xx or 5xx error
   *
   **/

  beforeAll(() => {
    console.log('ub-c1: beforeAll ')
    /**
     *  Error: Uncaught [TypeError: window.getSelection is not a function]
     *  : need to mock this
     **/
    window.getSelection = () => {
      return {
        removeAllRanges: () => { }
      } as Selection
    }
  })

  beforeEach(() => {
    console.log('ub-c1: beforeEach ')
  })

  /** test for use case which does not matter screen size  here**/
  test('a1. (validation) should display error msg when blog title is null/empty', async () => {

    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )
      const titleInput = await waitForElement(() => getByLabelText('Title'))
      fireEvent.focus(titleInput) // need to focus to enable to display validation error on dom
      fireEvent.change(titleInput, { target: { value: '' } })
      const titleErrorNode = await waitForElement(() => getByText('title is a required field'))
      expect(titleErrorNode).toBeInTheDocument()
    })
  })

  test('a2. (validation) should not allow to update when blog title is null/empty', async () => {

    api.request = jest.fn()
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )
      const titleInput = await waitForElement(() => getByLabelText('Title'))
      fireEvent.focus(titleInput) // need to focus to enable to display validation error on dom
      fireEvent.change(titleInput, { target: { value: '' } })
      const titleErrorNode = await waitForElement(() => getByText('title is a required field'))
      fireEvent.click(getByRole('save-btn'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

  test('a3. (validation) should display error msg when subtitle is null/empty', async () => {

    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )
      const subtitleInput = await waitForElement(() => getByLabelText('Subtitle'))
      fireEvent.focus(subtitleInput) // need to focus to enable to display validation error on dom
      fireEvent.change(subtitleInput, { target: { value: '' } })
      const subtitleErrorNode = await waitForElement(() => getByText('subtitle is a required field'))
      expect(subtitleErrorNode).toBeInTheDocument()
    })
  })

  test('a4.  (validation) should not allow to update when subtitle is null/empty', async () => {

    api.request = jest.fn()
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )
      const subtitleInput = await waitForElement(() => getByLabelText('Subtitle'))
      fireEvent.focus(subtitleInput) // need to focus to enable to display validation error on dom
      fireEvent.change(subtitleInput, { target: { value: '' } })
      const subtitleErrorNode = await waitForElement(() => getByText('subtitle is a required field'))
      fireEvent.click(getByRole('save-btn'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      expect(api.request).toHaveBeenCalledTimes(0)
    })
  })

//  test('a5. (api fetch) should not start api request when this component is updated', async () => {
//
//    await act(async () => {
//      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
//        <ContextWrapperComponent component={NewBlog} isAuth />
//      )
//      const contentInput = await waitForElement(() => getByLabelText('Content'))
//      fireEvent.focus(contentInput) // need to focus to enable to display validation error on dom
//      fireEvent.change(contentInput, { target: { value: '' } })
//      const contentErrorNode = await waitForElement(() => getByText('content is a required field'))
//      expect(contentErrorNode).toBeInTheDocument()
//    })
//  })
//
//  test('a6. (validation) should not allow to update when content is null/empty', async () => {
//
//    api.request = jest.fn().mockReturnValue(Promise.resolve(singleBlogGET200NonEmptyResponse))
//    await act(async () => {
//      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
//        <ContextWrapperComponent component={NewBlog} isAuth />
//      )
//      const contentInput = await waitForElement(() => getByLabelText('Content'))
//      fireEvent.focus(contentInput) // need to focus to enable to display validation error on dom
//      fireEvent.change(contentInput, { target: { value: '' } })
//      const contentErrorNode = await waitForElement(() => getByText('content is a required field'))
//      fireEvent.click(getByRole('save-btn'))
//      await waitForElement(() => getByText('please fix validation errors before submit'))
//      expect(api.request).toHaveBeenCalledTimes(0)
//    })
//  })
//
//  // the order of values must match node array
//  const seedInputTestValues = (targetNodes: HTMLElement[], values: string[]): void => {
//    targetNodes.forEach((node: HTMLElement, index: number) => {
//      fireEvent.focus(node)
//      fireEvent.change(node, { target: { value: values[index] } })
//    })
//  }
//
//  test('a7. (EH) should start save request when "save" is clicked', async () => {
//
//    api.request = jest.fn().mockResolvedValue(noDateGET200Response)
//    await act(async () => {
//      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
//        <ContextWrapperComponent component={NewBlog} isAuth />
//      )
//
//      const inputs = await waitForElement(() => [
//        getByLabelText('Title'),
//        getByLabelText('Subtitle'),
//        getByLabelText('Content'),
//      ])
//
//      seedInputTestValues(inputs, [
//        'test-title',
//        'test-subtitle',
//        'test-content',
//      ])
//      // must wait until fetch is completed
//      const saveBtn = await waitForElement(() => getByRole('save-btn'))
//      fireEvent.click(saveBtn)
//      // wait until below expectation is met otherwise, timeout
//      await wait(() => {
//        expect(api.request).toHaveBeenCalledTimes(1)
//      })
//    })
//  })
//
//  test('a8. (DOM) should show "save success" message when save completed', async () => {
//
//    await act(async () => {
//      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
//        <ContextWrapperComponent component={NewBlog} isAuth />
//      )
//      const inputs = await waitForElement(() => [
//        getByLabelText('Title'),
//        getByLabelText('Subtitle'),
//        getByLabelText('Content'),
//      ])
//
//      seedInputTestValues(inputs, [
//        'test-title',
//        'test-subtitle',
//        'test-content',
//      ])
//      // must wait until fetch is completed
//      const saveBtn = await waitForElement(() => getByRole('save-btn'))
//      // mock response of save request
//      api.request = jest.fn().mockResolvedValue(noDateGET200Response)
//      fireEvent.click(saveBtn)
//      await wait(() => {
//        expect(getByText('ok')).toBeInTheDocument()
//      })
//    })
//  })
//
//  test('a9. (DOM) should show "save failure" message when save failed because of network issue', async () => {
//
//    await act(async () => {
//      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
//        <ContextWrapperComponent component={NewBlog} isAuth />
//      )
//      const inputs = await waitForElement(() => [
//        getByLabelText('Title'),
//        getByLabelText('Subtitle'),
//        getByLabelText('Content'),
//      ])
//
//      seedInputTestValues(inputs, [
//        'test-title',
//        'test-subtitle',
//        'test-content',
//      ])
//      // must wait until fetch is completed
//      const saveBtn = await waitForElement(() => getByRole('save-btn'))
//      // mock response of save request
//      api.request = jest.fn().mockRejectedValue(networkError)
//      fireEvent.click(saveBtn)
//      await wait(() => {
//        expect(getByText('failed')).toBeInTheDocument()
//      })
//    })
//  })
//
//  test('a10. (DOM) should show "save failure" message when save failed because of 4xx or 5xx error', async () => {
//
//    await act(async () => {
//      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
//        <ContextWrapperComponent component={NewBlog} isAuth />
//      )
//      const inputs = await waitForElement(() => [
//        getByLabelText('Title'),
//        getByLabelText('Subtitle'),
//        getByLabelText('Content'),
//      ])
//
//      seedInputTestValues(inputs, [
//        'test-title',
//        'test-subtitle',
//        'test-content',
//      ])
//      // must wait until fetch is completed
//      const saveBtn = await waitForElement(() => getByRole('save-btn'))
//      // mock response of save request
//      api.request = jest.fn().mockRejectedValue(internalServerError500Response)
//      fireEvent.click(saveBtn)
//      await wait(() => {
//        expect(getByText('failed')).toBeInTheDocument()
//      })
//    })
//  })

  afterEach(() => {
    console.log('ub-c1: afterEach ')
  })

  afterAll(() => {
    console.log('ub-c1: afterAll ')
  })

})





