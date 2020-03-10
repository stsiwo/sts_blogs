import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { api } from 'requests/api';
import { blogGET200NonEmptyResponse, blogGET200EmptyResponse, noDateGET200Response, internalServerError500Response, networkError, singleBlogGET200NonEmptyResponse } from '../../../../../requests/fixtures';
import UpdateBlog from 'ui/Content/Setting/BlogManagement/UpdateBlog/UpdateBlog'
import { ContextWrapperComponent } from '../../../../fixtures';
import { CssGlobalContextDefaultState } from 'Contexts/CssGlobalContext/CssGlobalContextDefaultState';
import '../../../../../data/mocks/localStorageMock'
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'), // use actual for all non-hook parts
  useParams: () => ({
    blogId: '1',
  }),
}));

describe('ub-c1: UpdateBlog Component testing', () => {

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
   * a5. (validation) should display error msg when blog title is null/empty and click 'publish' btn
   * a6. (validation) should not allow to publish when blog title is null/empty and click 'publish' btn
   * a7. (validation) should display error msg when subtitle is null/empty and click 'publish' btn 
   * a8. (validation) should not allow to publish when subtitle is null/empty and click 'publish' btn
   * a9. (DOM) should not allow to enter any duplicated tag  
   * a10. (validation) should display summary error msg when there is at least one of validation error and click 'publish' btn 
   * a11. (validation) should not allow to publish when there is at least one of validation error 
   * a12. (EH) should start publish request when "publish" is clicked 
   * a13. (DOM) should show "save success" message when save completed 
   * a14. (DOM) should show "save failure" message when save failed because of network issue 
   * a15. (DOM) should show "save failure" message when save failed because of 4xx or 5xx error
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
    //localStorage.clear()
  })

  /** test for use case which does not matter screen size  here**/
  test('a1. (api fetch) should start api request when this component is mounted', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(singleBlogGET200NonEmptyResponse))
    await act(async () => {
      render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
      )
    })
    expect(api.request).toHaveBeenCalled()
  })

  test('a2. (DOM) should display blog data in each input field after initial api request ', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(singleBlogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
      )

      await wait(() => {
        expect(getByLabelText('Title').getAttribute('value')).toBeTruthy()
        expect(getByLabelText('Subtitle').getAttribute('value')).toBeTruthy()
        // temply remove
        //expect(getByRole('blog-content-editable').getAttribute('value')).toBeTruthy()
      })
    })
  })

  test('a3. (api fetch) should display "no blog available" when initial fetch failed because of network error', async () => {

    // use mockRejectedValue rather than mockReturnedValue(Promise....)
    api.request = jest.fn().mockRejectedValue(networkError)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
      )
      await wait(() => {
        expect(getByText('sorry.. your data is not available now')).toBeInTheDocument()
      })
    })
  })

  test('a4. (api fetch) should display "no blog available" when initial fetch failed because of 4xx or 5xx', async () => {

    // use mockRejectedValue rather than mockReturnedValue(Promise....)
    api.request = jest.fn().mockRejectedValue(internalServerError500Response)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
      )
      await wait(() => {
        expect(getByText('sorry.. your data is not available now')).toBeInTheDocument()
      })
    })
  })

  /** test for use case which does not matter screen size  here**/
  test('a5. (validation) should display error msg when blog title is null/empty and click "publish" btn', async () => {

    api.request = jest.fn().mockResolvedValueOnce(singleBlogGET200NonEmptyResponse)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
      )
      const titleInput = await waitForElement(() => getByLabelText('Title'))
      fireEvent.focus(titleInput) // need to focus to enable to display validation error on dom
      fireEvent.change(titleInput, { target: { value: '' } })
      const titleErrorNode = await waitForElement(() => getByText('title is a required field'))
      expect(titleErrorNode).toBeInTheDocument()
    })
  })

  test('a6. (validation) should not allow to publish when blog title is null/empty and click "publish" btn', async () => {

    api.request = jest.fn().mockResolvedValueOnce(singleBlogGET200NonEmptyResponse)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
      )
      const titleInput = await waitForElement(() => getByLabelText('Title'))
      fireEvent.focus(titleInput) // need to focus to enable to display validation error on dom
      fireEvent.change(titleInput, { target: { value: '' } })
      const titleErrorNode = await waitForElement(() => getByText('title is a required field'))
      fireEvent.focus(getByRole('publish-btn')) // don't foreget focus first 
      fireEvent.click(getByRole('publish-btn'))
      await wait(() => {
        expect(titleErrorNode).toBeInTheDocument()
      })
    })
    expect(api.request).toHaveBeenCalledTimes(1) // initial fetch
  })

  test('a7. (validation) should display error msg when subtitle is null/empty and click "publish" btn', async () => {

    api.request = jest.fn().mockResolvedValueOnce(singleBlogGET200NonEmptyResponse)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
      )
      const subtitleInput = await waitForElement(() => getByLabelText('Subtitle'))
      fireEvent.focus(subtitleInput) // need to focus to enable to display validation error on dom
      fireEvent.change(subtitleInput, { target: { value: '' } })
      const subtitleErrorNode = await waitForElement(() => getByText('subtitle is a required field'))
      expect(subtitleErrorNode).toBeInTheDocument()
    })
  })

  test('a8. (validation) should not allow to publish when subtitle is null/empty and click "publish" btn', async () => {

    api.request = jest.fn().mockResolvedValueOnce(singleBlogGET200NonEmptyResponse)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
      )
      const subtitleInput = await waitForElement(() => getByLabelText('Subtitle'))
      fireEvent.focus(subtitleInput) // need to focus to enable to display validation error on dom
      fireEvent.change(subtitleInput, { target: { value: '' } })
      const subtitleErrorNode = await waitForElement(() => getByText('subtitle is a required field'))
      fireEvent.focus(getByRole('publish-btn')) // need to focus to enable to display validation error on dom
      fireEvent.click(getByRole('publish-btn'))
      await wait(() => {
        expect(subtitleErrorNode).toBeInTheDocument()
      })
    })
    expect(api.request).toHaveBeenCalledTimes(1) // initial fetch
  })

  // the order of values must match node array
  const seedInputTestValues = (targetNodes: HTMLElement[], values: string[]): void => {
    targetNodes.forEach((node: HTMLElement, index: number) => {
      fireEvent.focus(node)
      fireEvent.change(node, { target: { value: values[index] } })
    })
  }

  test('a9. (DOM) should not allow to enter any duplicated tag', async () => {
    api.request = jest.fn().mockResolvedValueOnce(singleBlogGET200NonEmptyResponse)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText, queryAllByRole, getAllByText } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
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
      const tagIcons = await waitForElement(() => getAllByText('#sample'))
      expect(tagIcons.length).toBe(1)
    })

  })

  test('a10. (validation) should display summary error msg when there is at least one of validation error and click "publish" btn', async () => {
    api.request = jest.fn().mockResolvedValueOnce(singleBlogGET200NonEmptyResponse)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText, queryByRole } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
      )
      const titleInput = await waitForElement(() => getByLabelText('Title'))
      fireEvent.focus(titleInput) // don't foreget focus first 
      await wait(() => {
        expect(queryByRole("input-field-error-msg")).toBeInTheDocument() 
      })

      // must wait until fetch is completed
      const publishBtn = await waitForElement(() => getByRole('publish-btn'))
      fireEvent.focus(publishBtn) // don't foreget focus first 
      fireEvent.click(publishBtn)
      // wait until below expectation is met otherwise, timeout
      await wait(() => {
        expect(getByRole('summary-input-error')).toBeInTheDocument()
      })
    })
  })

  test('a11. (validation) should not allow to publish when there is at least one of validation error', async () => {
    api.request = jest.fn().mockResolvedValueOnce(singleBlogGET200NonEmptyResponse)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
      )
      const titleInput = await waitForElement(() => getByLabelText('Title'))
      fireEvent.focus(titleInput) // don't foreget focus first 
      fireEvent.change(titleInput, { target: { value: '' } })


      // must wait until fetch is completed
      const publishBtn = await waitForElement(() => getByRole('publish-btn'))
      fireEvent.focus(publishBtn) // don't foreget focus first 
      fireEvent.click(publishBtn)
      const currentCallsNum = (api.request as any).mock.calls.length
      // wait until below expectation is met otherwise, timeout
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(currentCallsNum) // 1: initial fetch so count it
      })
    })

  })

  test('a12. (EH) should start publish request when "publish" is clicked', async () => {
    api.request = jest.fn().mockResolvedValueOnce(singleBlogGET200NonEmptyResponse)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText, queryByRole } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
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
      api.request = jest.fn().mockResolvedValue(noDateGET200Response)
      const currentCallsNum = (api.request as any).mock.calls.length
      fireEvent.focus(publishBtn) // don't foreget focus first 
      fireEvent.click(publishBtn)
      // wait until below expectation is met otherwise, timeout
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(currentCallsNum + 1)
      })
    })
  })

  test('a13. (DOM) should show "save success" message when save completed', async () => {

    api.request = jest.fn().mockResolvedValueOnce(singleBlogGET200NonEmptyResponse)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText, queryByRole } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
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

  test('a14. (DOM) should show "save failure" message when save failed because of network issue', async () => {

    api.request = jest.fn().mockResolvedValueOnce(singleBlogGET200NonEmptyResponse)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText, queryByRole } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
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

  test('a15. (DOM) should show "save failure" message when save failed because of 4xx or 5xx error', async () => {

    api.request = jest.fn().mockResolvedValueOnce(singleBlogGET200NonEmptyResponse)
    await act(async () => {
      const { getByText, getByRole, getAllByRole, debug, getByLabelText } = render(
        <ContextWrapperComponent component={UpdateBlog} isAuth />
      )
      const inputs = await waitForElement(() => [
        getByLabelText('Title'),
        getByLabelText('Subtitle'),
      ])

      seedInputTestValues(inputs, [
        'test-title',
        'test-subtitle',
      ])
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




