import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import { api } from 'requests/api';
import { blogGET200NonEmptyResponse, blogGET200EmptyResponse, noDateGET200Response, internalServerError500Response, networkError, singleBlogGET200NonEmptyResponse } from '../../../../../requests/fixtures';
import NewBlog from 'ui/Content/Setting/BlogManagement/NewBlog/NewBlog'
import { ContextWrapperComponent } from '../../../../fixtures';
import { CssGlobalContextDefaultState } from 'Contexts/CssGlobalContext/CssGlobalContextDefaultState';
jest.setTimeout(10000)


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
   * //a1. (EH) should start 'autosave' fetch when initial page load
   * a2. (EH) should start 'autosave' fetch every time one of blog property changes 
   * a3. (validation) should display error msg when blog title is null/empty and click 'publish' btn
   * a4. (validation) should not allow to publish when blog title is null/empty and click 'publish' btn
   * a5. (validation) should display error msg when subtitle is null/empty and click 'publish' btn 
   * a6. (validation) should not allow to publish when subtitle is null/empty and click 'publish' btn
   * a7. (DOM) should not allow to enter any duplicated tag  
   * a8. (validation) should display summary error msg when there is at least one of validation error and click 'publish' btn 
   * a9. (validation) should not allow to publish when there is at least one of validation error 
   * a10. (EH) should start publish request when "publish" is clicked 
   * a11. (DOM) should show "save success" message when save completed 
   * a12. (DOM) should show "save failure" message when save failed because of network issue 
   * a13. (DOM) should show "save failure" message when save failed because of 4xx or 5xx error
   *
   **/

  beforeAll(() => {
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
  })

  //test('a1. (EH) should start "autosave" fetch when initial page load', async () => {
  //  api.request = jest.fn()
  //  await act(async () => {
  //    const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
  //      <ContextWrapperComponent component={NewBlog} isAuth />
  //    )
  //    const titleInput = await waitForElement(() => getByLabelText('Title'))
  //    expect(api.request).toHaveBeenCalled()
  //  })
  //})

  test('a2. (EH) should start "autosave" fetch every time one of blog property changes', async () => {
    api.request = jest.fn()
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )
      const titleInput = await waitForElement(() => getByLabelText('Title'))
      fireEvent.focus(titleInput) // need to focus to enable to display validation error on dom
      fireEvent.change(titleInput, { target: { value: 'hey' } })

      // actual autosave with debounce
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(1)
      })
    })
  })

  /** test for use case which does not matter screen size  here**/
  test('a3. (validation) should display error msg when blog title is null/empty and click "publish" btn', async () => {

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

  test('a4. (validation) should not allow to publish when blog title is null/empty and click "publish" btn', async () => {

    api.request = jest.fn()
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )
      const titleInput = await waitForElement(() => getByLabelText('Title'))
      fireEvent.focus(titleInput) // need to focus to enable to display validation error on dom
      fireEvent.change(titleInput, { target: { value: '' } })
      const titleErrorNode = await waitForElement(() => getByText('title is a required field'))
      fireEvent.focus(getByRole('publish-btn')) // don't foreget focus first 
      fireEvent.click(getByRole('publish-btn'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(1)
      })
    })
  })

  test('a5. (validation) should display error msg when subtitle is null/empty and click "publish" btn', async () => {

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

  test('a6. (validation) should not allow to publish when subtitle is null/empty and click "publish" btn', async () => {

    api.request = jest.fn()
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )
      const subtitleInput = await waitForElement(() => getByLabelText('Subtitle'))
      fireEvent.focus(subtitleInput) // need to focus to enable to display validation error on dom
      fireEvent.change(subtitleInput, { target: { value: '' } })
      const subtitleErrorNode = await waitForElement(() => getByText('subtitle is a required field'))
      fireEvent.focus(getByRole('publish-btn')) // need to focus to enable to display validation error on dom
      fireEvent.click(getByRole('publish-btn'))
      await waitForElement(() => getByText('please fix validation errors before submit'))
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(1)
      })
    })
  })

  // the order of values must match node array
  const seedInputTestValues = (targetNodes: HTMLElement[], values: string[]): void => {
    targetNodes.forEach((node: HTMLElement, index: number) => {
      fireEvent.focus(node)
      fireEvent.change(node, { target: { value: values[index] } })
    })
  }

  test('a7. (DOM) should not allow to enter any duplicated tag', async () => {
    api.request = jest.fn()
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText, queryAllByRole } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )
      const tagsInput = await waitForElement(() => getByLabelText('Tags'))
      // try to input depulicated tag
      // first attempt
      fireEvent.focus(tagsInput) // need to focus to enable to display validation error on dom
      fireEvent.change(tagsInput, { target: { value: 'sample' } })
      /**
       * keyPress does not work even if i tried to add 'charCode'
       * https://github.com/testing-library/react-testing-library/issues/269
       *  - but when change to 'keyDown' it works
       **/
      fireEvent.keyDown(tagsInput, { key: 'Enter', code: 13, charCode: 13 })
      // second attempt
      fireEvent.focus(tagsInput) // need to focus to enable to display validation error on dom
      fireEvent.change(tagsInput, { target: { value: 'sample' } })
      fireEvent.keyDown(tagsInput, { key: 'Enter', code: 13, charCode: 13 })
      const tagIcons = await waitForElement(() => queryAllByRole('tag-icon'))
      expect(tagIcons.length).toBe(1)
    })

  })

  test('a8. (validation) should display summary error msg when there is at least one of validation error and click "publish" btn', async () => {
    api.request = jest.fn()
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText, queryByRole } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )

      // must wait until fetch is completed
      const publishBtn = await waitForElement(() => getByRole('publish-btn'))

      // wait for initial validation for all fields (there is no way to wait state update in this library so use below)
      const titleNode = await waitForElement(() => getByLabelText("Title"))
      fireEvent.focus(titleNode)
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeInTheDocument() 
      })

      fireEvent.focus(publishBtn) // don't foreget focus first 
      fireEvent.click(publishBtn)
      // wait until below expectation is met otherwise, timeout
      debug()
      await wait(() => {
        expect(getByRole('summary-input-error')).toBeInTheDocument()
      })
    })
  })

  test('a9. (validation) should not allow to publish when there is at least one of validation error', async () => {
    api.request = jest.fn()
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )

      // must wait until fetch is completed
      const publishBtn = await waitForElement(() => getByRole('publish-btn'))
      fireEvent.focus(publishBtn) // don't foreget focus first 
      fireEvent.click(publishBtn)
      // wait until below expectation is met otherwise, timeout
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(1) // 1: initial fetch so count it
      })
    })

  })

  test('a10. (EH) should start publish request when "publish" is clicked', async () => {
    api.request = jest.fn().mockResolvedValue(noDateGET200Response)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText, queryByRole } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )

      // need to do individually otherwise, got errors
      const titleInput = await waitForElement(() => getByLabelText("Title"))
      fireEvent.focus(titleInput)
      // need for only first field to wait for initial validation 
      // use this because there is no way to wait state update
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeInTheDocument()
      })
      fireEvent.change(titleInput, { target: { value: "test-title" } })
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeNull()
      })

      const subtitleInput = await waitForElement(() => getByLabelText("Subtitle"))
      fireEvent.focus(subtitleInput)
      fireEvent.change(subtitleInput, { target: { value: "test-subtitle" } })
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeNull()
      })

      // must wait until fetch is completed
      api.request = jest.fn().mockResolvedValue(noDateGET200Response)
      const publishBtn = await waitForElement(() => getByRole('publish-btn'))
      fireEvent.focus(publishBtn) // don't foreget focus first 
      fireEvent.click(publishBtn)
      const currentCallsNum = (api.request as any).mock.calls.length
      // wait until below expectation is met otherwise, timeout
      await wait(() => {
        expect(getByRole("fetch-success-status")).toBeInTheDocument() 
      })
    })
  })

  test('a11. (DOM) should show "save success" message when save completed', async () => {

    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText, queryByRole } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )
      // need to do individually otherwise, got errors
      const titleInput = await waitForElement(() => getByLabelText("Title"))
      fireEvent.focus(titleInput)
      // need for only first field to wait for initial validation 
      // use this because there is no way to wait state update
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeInTheDocument()
      })
      fireEvent.change(titleInput, { target: { value: "test-title" } })
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeNull()
      })

      const subtitleInput = await waitForElement(() => getByLabelText("Subtitle"))
      fireEvent.focus(subtitleInput)
      fireEvent.change(subtitleInput, { target: { value: "test-subtitle" } })
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeNull()
      })

      // must wait until fetch is completed
      const publishBtn = await waitForElement(() => getByRole('publish-btn'))
      // mock response of save request
      api.request = jest.fn().mockResolvedValue(noDateGET200Response)
      fireEvent.focus(publishBtn) // don't foreget focus first 
      fireEvent.click(publishBtn)
      await wait(() => {
        expect(getByText('ok')).toBeInTheDocument()
      })
    })
  })

  test('a12. (DOM) should show "save failure" message when save failed because of network issue', async () => {

    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText, queryByRole } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )
      // need to do individually otherwise, got errors
      const titleInput = await waitForElement(() => getByLabelText("Title"))
      fireEvent.focus(titleInput)
      // need for only first field to wait for initial validation 
      // use this because there is no way to wait state update
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeInTheDocument()
      })
      fireEvent.change(titleInput, { target: { value: "test-title" } })
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeNull()
      })

      const subtitleInput = await waitForElement(() => getByLabelText("Subtitle"))
      fireEvent.focus(subtitleInput)
      fireEvent.change(subtitleInput, { target: { value: "test-subtitle" } })
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeNull()
      })

      // must wait until fetch is completed
      const publishBtn = await waitForElement(() => getByRole('publish-btn'))
      // mock response of save request
      api.request = jest.fn().mockRejectedValue(networkError)
      fireEvent.focus(publishBtn) // don't foreget focus first 
      fireEvent.click(publishBtn)
      await wait(() => {
        expect(getByText('failed')).toBeInTheDocument()
      })
    })
  })

  test('a13. (DOM) should show "save failure" message when save failed because of 4xx or 5xx error', async () => {

    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText, queryByRole } = render(
        <ContextWrapperComponent component={NewBlog} isAuth />
      )

      // need to do individually otherwise, got errors
      const titleInput = await waitForElement(() => getByLabelText("Title"))
      fireEvent.focus(titleInput)
      // need for only first field to wait for initial validation 
      // use this because there is no way to wait state update
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeInTheDocument()
      })
      fireEvent.change(titleInput, { target: { value: "test-title" } })
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeNull()
      })

      const subtitleInput = await waitForElement(() => getByLabelText("Subtitle"))
      fireEvent.focus(subtitleInput)
      fireEvent.change(subtitleInput, { target: { value: "test-subtitle" } })
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeNull()
      })

      // must wait until fetch is completed
      const publishBtn = await waitForElement(() => getByRole('publish-btn'))
      // mock response of save request
      api.request = jest.fn().mockRejectedValue(internalServerError500Response)
      fireEvent.focus(publishBtn) // don't foreget focus first 
      fireEvent.click(publishBtn)
      await wait(() => {
        expect(getByText('failed')).toBeInTheDocument()
      })
    })
  })

  afterEach(() => {
  })

  afterAll(() => {
  })

})





