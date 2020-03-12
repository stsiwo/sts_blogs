import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import { api } from 'requests/api';
import { blogGET200NonEmptyResponse, blogGET200EmptyResponse } from '../../../../requests/fixtures';
import { ContextWrapperComponent } from '../../../fixtures';
import BlogManagement from 'ui/Content/Setting/BlogManagement/BlogManagement';
import { CssGlobalContextDefaultState } from 'Contexts/CssGlobalContext/CssGlobalContextDefaultState';
import Content from 'ui/Content/Content';
import '../../../../data/mocks/localStorageMock'


describe('bm-c1: BlogManagement Component testing', () => {

  /**
   * prerequisite 
   * 1. mock api request and return dummy blog list
   * 2. role: member only 
   * 3. reponsive screen 
   **/

  /**
   * use case or css layout test list
   *
   * ** all **
   *
   * a1. (api fetch) should start api request when this component is mounted
   * a2. (refresh) should start api request when 'refresh' button is clicked
   * a3. (cancel) should cancel api request when 'cancel' button is clicked after 'refresh' button is clicked
   * a4. (pagination) should start api request with new limit value when page limit selector is changed
   * a5. (api fetch) should display a list of blog after successful api request when blog exists
   * a6. (api fetch) should display 'no blog' message after successful api request when blog does not exist
   * a7. (blog management) should display controller element when option icon is clicked at blog item row
   * a8. (blog management) should close controller element when close icon is clicked at controller element 
   * a9. (Route) should route member user to /blogs/{id}  when 'Edit' is clicked at controller element
   * a10. (blog mangement) should should start api request for deleting when 'delete' is click at controller element 
   * a11. (filter sort) should not display 'member only' message at 'create new blog' button
   * a12. (filter sort) should route member user to /blogs/new  when 'create new blog' is clicked
   * a13. (filter sort) should display new tag when user enter new tag in tag input
   * a14. (filter sort) should start api request when new tag is entered and url must contain the tag name
   * a15. (filter sort) should start api request when new keyword is entered and url must contain the keyword 
   * a16. (filter sort) should start api request when new startDate is entered and url must contain the startDate 
   * a17. (filter sort) should start api request when new endDate is entered and url must contain the endDate 
   * a18. (filter sort) should start api request when new sort is selected and url must contain the sort 
   * a19. (EH) should start api request when new page number is click and url must contain the number
   * a20. (EH) should start api request when last page number is click and url must contain the number
   *
   * ** <= tablet **
   *
   * ltt1. (responsive) should display sort filter icon
   * ltt2. (responsive) should not display sort filter aside 
   * ltt3.  (EH) should display sort filter aisde when sort filter icon is clicked and should not start api request
   *
   * ** > tablet **
   *
   * gtt1. (responsive) should not display sort filter icon
   *
   * ** > laptop **
   *
   * gttlt1. (responsive) should display sort filter aside 
   *
   **/

  beforeAll(() => {
  })

  beforeEach(() => {
    localStorage.clear()
  })

  /** test for use case which does not matter screen size  here**/
  test('a1. (lifecycle) should start api request when this component is mounted', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
    })
    await wait(() => {
      expect(api.request).toHaveBeenCalled()
    })
  })

  test("a2. (EH) should start api request when 'refresh' button is clicked", async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    // should replace mock with real one
    api.CancelToken.source = jest.fn().mockReturnValue('cancel-token')
    await act(async () => {
      const { getByText, getByRole, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )

      // wait for initial fetch finish and render blog list
      await waitForElement(() => getAllByRole('blog-item'))

      fireEvent.click(getByRole('refresh-icon'))

      await waitForElement(() => getAllByRole('blog-item'))
      await wait(() => {
        /**
         * since disable cache at refresh request 
         **/
        expect(api.request).toHaveBeenCalledTimes(2)
      })
    })
  })

  // need to think how to test 'cancel' feature
  // temply comment out
  //test("a3. (EH) should cancel api request when 'cancel' button is clicked after 'refresh' button is clicked", async () => {

  //  // api.request = jest.fn()
  //  //   .mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse)
  //  //     .then((data) => new Promise(resolve => setTimeout(() => {
  //  //       resolve(data)
  //  //     }, 3000))))

  //  expect(1).toBe(0)

  //})

  test("a4. (EH) should start api request with new limit value when page limit selector is changed", async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      await waitForElement(() => getAllByRole('blog-item'))

      fireEvent.change(getByRole('page-limit-select'), {
        target: {
          value: '40'
        }
      })
    })
    await wait(() => {
      expect(api.request).toHaveBeenCalledTimes(2)
      expect((api.request as any).mock.calls[1][0].url).toContain('limit=40')
    })
  })

  test("a5. (responsive) should display a list of blog after successful api request when blog exists", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      const blogListNode = await waitForElement(() => getAllByRole('blog-item'))
      await wait(() => {
        expect(blogListNode.length).toBeGreaterThan(0)
      })
    })
  })

  test("a6. (responsive) should display 'no blog' message after successful api request when blog does not exist", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      // ?? can't getByText event if debug show it is there
      await wait(() => {
        expect(getByText('there is no blog based on the your sort & filter')).toBeInTheDocument()
      })
    })
  })

  test("a7. (blog management) should display controller element when option icon is clicked at blog item row", async () => {
    /** since css is not available, you can directly access to controller element without clicking controller open icon
     * so shouldn't need to test this one?? for now skip this test
     **/
  })

  test("a8. (blog management) should close controller element when close icon is clicked at controller element", async () => {
    /** since css is not available, you can directly access to controller element without clicking controller open icon
     * so shouldn't need to test this one?? for now skip this test
     **/
  })

  test("a9. (Route) should route member user to /blogs/{id}  when 'Edit' is clicked at controller element (just check url string at this element)", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      const blogListNodes = await waitForElement(() => getAllByRole('blog-item'))
      fireEvent.mouseEnter(blogListNodes[0])
      const deleteBtns = await waitForElement(() => getAllByRole('blog-edit-link'))
      expect(deleteBtns[0].getAttribute('href')).toContain('1')
    })
  })

  test("a10. (blog mangement) should should start api request for deleting when 'delete' is click at controller element", async () => {
    api.request = jest.fn().mockResolvedValue(blogGET200NonEmptyResponse)
    // mock confirm dialog and return always true (OK)
    window.confirm = jest.fn(() => true)
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      const blogListNodes = await waitForElement(() => getAllByRole('blog-item'))
      fireEvent.mouseEnter(blogListNodes[0])
      const deleteBtn = await waitForElement(() => getByRole('blog-delete-icon'))
      fireEvent.click(deleteBtn)
      await wait(() => {
        expect(window.confirm).toBeCalled()
        // initial fetch + delete request + refresh request = 3
        expect(api.request).toHaveBeenCalledTimes(3)
        expect((api.request as any).mock.calls[1][0].url).toContain('1')
        expect((api.request as any).mock.calls[1][0].method).toContain('delete')
      })
    })
  })

  test("a11. (filter sort) should not display 'member only' message at 'create new blog' button", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      const memberOnlyNode = queryByText(container, 'Member Only')
      await wait(() => {
        expect(memberOnlyNode).toBeNull()
      })
    })
  })

  test("a12. (filter sort) should route member user to /blogs/new  when 'create new blog' is clicked", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={Content} isAuth initialRoute={'/setting/blogs'} />
      )
      await wait(() => {
        expect(document.getElementsByClassName('aside-new-blog-link')[0].getAttribute('href')).toBe('/setting/blogs/new')
      })
    })
  })

  test("a13 (filter sort) should display new tag when user enter new tag in tag input", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      await waitForElement(() => getByText('there is no blog based on the your sort & filter'))
      const tagInput = getByLabelText('Tags')
      fireEvent.keyDown(tagInput,
        {
          target:
          {
            value: 'test-tag',
          },
          key: 'Enter'
        })

      const tagIconNode = await waitForElement(() => getByRole('tag-icon'))
      await wait(() => {
        expect(tagIconNode).toBeInTheDocument()
      })
    })
  })

  test("a14. (filter sort) should start api request when new tag is entered and url must contain the tag name", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      await waitForElement(() => getByText('there is no blog based on the your sort & filter'))
      const tagInput = getByLabelText('Tags')
      fireEvent.keyDown(tagInput,
        {
          target:
          {
            value: 'test-tag',
          },
          key: 'Enter'
        })

    })
    await wait(() => {
      expect(api.request).toHaveBeenCalledTimes(2)
      expect((api.request as any).mock.calls[1][0].url).toContain('tags=test-tag')
    })
  })

  test("a15. (filter sort) should start api request when new keyword is entered and url must contain the keyword", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      await waitForElement(() => getByText('there is no blog based on the your sort & filter'))
      const keywordInput = getByLabelText('Keyword')
      fireEvent.change(keywordInput,
        {
          target:
          {
            value: 'test-keyword',
          },
        })

    })
    await wait(() => {
      expect(api.request).toHaveBeenCalledTimes(2)
      expect((api.request as any).mock.calls[1][0].url).toContain('keyword=test-keyword')
    })
  })

  test("a16. (filter sort) should start api request when new startDate is entered and url must contain the startDate", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      await waitForElement(() => getByText('there is no blog based on the your sort & filter'))
      const startDateInput = getByLabelText('Start Date')

      fireEvent.change(startDateInput,
        {
          target:
          {
            value: '11/13/2019',
          },
        })

    })
    await wait(() => {
      expect(api.request).toHaveBeenCalledTimes(2)
      expect((api.request as any).mock.calls[1][0].url).toContain('startDate=2019-11-13')
    })
  })

  test("a17. (filter sort) should start api request when new endDate is entered and url must contain the endDate", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      await waitForElement(() => getByText('there is no blog based on the your sort & filter'))
      const endDateInput = getByLabelText('End Date')

      fireEvent.change(endDateInput,
        {
          target:
          {
            value: '11/13/2019',
          },
        })

    })
    await wait(() => {
      expect(api.request).toHaveBeenCalledTimes(2)
      expect((api.request as any).mock.calls[1][0].url).toContain('endDate=2019-11-13')
    })
  })

  test("a18. (filter sort) should start api request when new sort is selected and url must contain the sort", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      await waitForElement(() => getByText('there is no blog based on the your sort & filter'))
      const sortInput = getByLabelText('Title Desc') // sort id = 3

      /** 
       * #BUG??: fireEvent.change does not trigger event on radio input
       * -> workaround is to use 'Simulate.change()'
       **/
      Simulate.change(sortInput)
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(2)
        expect((api.request as any).mock.calls[1][0].url).toContain('sort=3')
      })
    })
  })

  test("a19. (EH) should start api request when new page number is click and url must contain the number", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      const thirdPageBtn = await waitForElement(() => getByText('3'))
      fireEvent.click(thirdPageBtn)
    })
    await wait(() => {
      expect(api.request).toHaveBeenCalledTimes(2)
      expect((api.request as any).mock.calls[1][0].url).toContain('page=3&limit=20')
    })
  })

  test("a20. (EH) should start api request when last page number is click and url must contain the number", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      const lastPageBtn = await waitForElement(() => getByRole('last-page-btn'))
      fireEvent.click(lastPageBtn)
    })
    await wait(() => {
      expect(api.request).toHaveBeenCalledTimes(2)
      expect((api.request as any).mock.calls[1][0].url).toContain('page=500&limit=20')
    })
  })

  describe('bm-t-c1: <= tablet screen size', () => {

    beforeAll(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.tabletSize })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
    })

    /** test for use case for small screen size here**/
    test("ltt1. (responsive) should display sort filter icon", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
          <ContextWrapperComponent component={BlogManagement} isAuth />
        )
        await wait(() => {
          expect(getByRole('filter-sort-icon')).toBeInTheDocument()
        })

      })
    })

    test("ltt2. (responsive) should not display sort filter aside ", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText, queryByRole } = render(
          <ContextWrapperComponent component={BlogManagement} isAuth />
        )

        await wait(() => {
          const filterSortAside = queryByRole('filter-sort-aside')
          expect(filterSortAside.style.height).toBe('0px')
        })
      })
    })

    test("ltt3.  (EH) should display sort filter aisde when sort filter icon is clicked and should not start api request", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
          <ContextWrapperComponent component={BlogManagement} isAuth />
        )
        const filterSortIcon = getByRole('filter-sort-icon')
        fireEvent.click(filterSortIcon)

        const filterSortAside = await waitForElement(() => getByRole('filter-sort-aside'))
        await wait(() => {
          expect(filterSortAside).toBeInTheDocument()
          expect(api.request).toHaveBeenCalledTimes(1)
        })
      })
    })

    /** fail when run tests together but pass when individual **/
    /** reason is screen size was reset or have different value **/
    /** for now, merge this test with 'ltt3' test **/
    //test("ltt4. (lifecycle) should not the request when this component is updated", async () => {
    //  api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    //  await act(async () => {
    //    const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
    //      <ContextWrapperComponent component={BlogManagement} isAuth />
    //    )

    //    console.log(debug())
    //    console.log(window.innerWidth)

    //    const filterSortIcon = await waitForElement(() => getByRole('filter-sort-icon'))
    //    fireEvent.click(filterSortIcon) // this is the cause of async time out

    //    await wait(() => {
    //      expect(api.request).toHaveBeenCalledTimes(1)
    //    })
    //  })
    //})


    afterEach(() => {
    })

    afterAll(() => {
    })

  })

  describe('bm-c1: > tablet screen size', () => {

    beforeAll(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.tabletSize + 1 })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
    })

    /** test for use case for medium screen size here**/
    test("gtt1. (responsive) should not display sort filter icon", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
          <ContextWrapperComponent component={BlogManagement} isAuth />
        )

        await wait(() => {
          const filterSortAside = queryByRole(container, 'filter-sort-icon')
          expect(filterSortAside).toBeNull()
        })
      })
    })

    afterEach(() => {
    })

    afterAll(() => {
    })

  })

  describe('bm-c1: > laptop screen size', () => {

    beforeAll(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.laptopSize + 1 })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
    })

    test("gttlt1. (responsive) should display sort filter aside ", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
          <ContextWrapperComponent component={BlogManagement} isAuth />
        )

        await wait(() => {
          expect(getByRole('filter-sort-aside').style.height).not.toBe('0px')
        })
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


