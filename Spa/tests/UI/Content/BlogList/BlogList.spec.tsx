import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import { api } from "requests/api";
import { CssGlobalContextDefaultState } from "Contexts/CssGlobalContext/CssGlobalContextDefaultState";
import BlogList from "ui/Content/BlogList/BlogList";
import { blogGET200EmptyResponse, blogGET200NonEmptyResponse } from "../../../requests/fixtures";
import { ContextWrapperComponent } from "../../fixtures";
import Content from 'ui/Content/Content';
// setup mocked localstorage 
import '../../../data/mocks/localStorageMock.ts'



describe('bl-c1: BlogList Component testing', () => {

  /**
   * prerequisite 
   * 1. mock api request and return dummy blog list
   * 2. role: guest and member
   * 3. reponsive screen 
   **/

  /**
   * use case or css layout test list
   *
   * ** all **
   *
   * a1. (css) should not have any overflown element. <- this is impossible 
   * a2. (lifecycle) should start api request when this component is mounted
   * a4. (EH) should start api request when 'refresh' button is clicked
   * a5. (EH) should cancel api request when 'cancel' button is clicked after 'refresh' button is clicked
   * a6. (EH) should start api request with new limit value when page limit selector is changed
   * a7. (responsive) should display a list of blog after successful api request when blog exists
   * a8. (responsive) should display 'no blog' message after successful api request when blog does not exist
   * a9. (responsive) (guest) should display 'member only' message at 'create new blog' button
   * a10. (Route) (guest) should route guest user to login/signup when 'create new blog' is clicked
   * a11. (DOM) (member) should not display 'member only' message at 'create new blog' button
   * a12. (Route) (member) should route member user to /blogs/new  when 'create new blog' is clicked
   * a13. (DOM) should display new tag when user enter new tag in tag input
   * a14. (EH) should start api request when new tag is entered and url must contain the tag name
   * a15. (EH) should start api request when new keyword is entered and url must contain the keyword 
   * a16. (EH) should start api request when new startDate is entered and url must contain the startDate 
   * a17. (EH) should start api request when new endDate is entered and url must contain the endDate 
   * a18. (EH) should start api request when new sort is selected and url must contain the sort 
   * a19. (Route) should route user to specified blog detail page when one of blog is clicked
   * a20. (EH) should start api request when new page number is click and url must contain the number
   * a21. (EH) should start api request when last page number is click and url must contain the number
   * a22. (cache) should cache response data in localStorage after request 
   * a23. (cache) should use cached data when request to the same endpoint (with queryString) 
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
    console.log('bl-c1: beforeAll ')
  })

  beforeEach(() => {
    localStorage.clear()
    console.log('bl-c1: beforeEach ')
  })

  /** test for use case which does not matter screen size  here**/
  test('a2. (lifecycle) should start api request when this component is mounted', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      render(
        <ContextWrapperComponent component={BlogList} />
      )
    })

    expect(api.request).toHaveBeenCalled()
  })

  test("a4. (EH) should start api request when 'refresh' button is clicked", async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    // should replace mock with real one
    //api.CancelToken.source = jest.fn().mockReturnValue('cancel-token')
    await act(async () => {
      const { getByText, getByRole, getAllByRole } = render(
        <ContextWrapperComponent component={BlogList} />
      )

      // wait for initial fetch finish and render blog list
      await waitForElement(() => getAllByRole('blog-item'))

      fireEvent.click(getByRole('refresh-icon'))

      await waitForElement(() => getAllByRole('blog-item'))

    })
    /**
     * since cache is available, the number of request call is only once
     **/
    expect(api.request).toHaveBeenCalledTimes(1)

  })

  const delayedResolvedValue = (data: any): Promise<any> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(data)
      }, 1000)
    })
  }

  // need to think how to test 'cancel' feature
  // temply comment out
  //test("a5. (EH) should cancel api request when 'cancel' button is clicked after 'refresh' button is clicked", async () => {

  //  api.request = jest.fn().mockResolvedValue(blogGET200NonEmptyResponse)
  //  await act(async () => {
  //    const { getByText, getByRole, getAllByRole, debug } = render(
  //      <ContextWrapperComponent component={BlogList} />
  //    )
  //    const refreshBtn = await waitForElement(() => getByRole('refresh-icon'))
  //    api.request = jest.fn().mockReturnValue(delayedResolvedValue(blogGET200NonEmptyResponse))
  //    fireEvent.click(refreshBtn)
  //    const cancelBtn = await waitForElement(() => getByRole('cancel-icon'))
  //    fireEvent.click(cancelBtn)
  //    const msg = await waitForElement(() => getByText('refresh request is canceled'))
  //    console.log(msg)
  //  })
  //})

  test("a6. (EH) should start api request with new limit value when page limit selector is changed", async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogList} />
      )
      await waitForElement(() => getAllByRole('blog-item'))

      fireEvent.change(getByRole('page-limit-select'), {
        target: {
          value: '40'
        }
      })
      await wait(() => {
        expect(api.request).toHaveBeenCalledTimes(2)
        expect((api.request as any).mock.calls[1][0].url).toContain('limit=40')
      })
    })
  })

  test("a7. (responsive) should display a list of blog after successful api request when blog exists", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogList} />
      )
      const blogListNode = await waitForElement(() => getAllByRole('blog-item'))
      expect(blogListNode.length).toBeGreaterThan(0)
    })
  })

  test("a8. (responsive) should display 'no blog' message after successful api request when blog does not exist", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogList} />
      )
      // ?? can't getByText event if debug show it is there
      await wait(() => {
        expect(getByText('there is no blog based on the your sort & filter')).toBeInTheDocument()
      })
    })
  })

  test("a12. (Route) (member) should route member user to /blogs/new  when 'create new blog' is clicked (just only check url string at Link component)", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={Content} isAuth initialRoute="/blogs" />
      )
      expect(document.getElementsByClassName('aside-new-blog-link')[0].getAttribute('href')).toBe('/setting/blogs/new')
    })
  })

  test("a13. (DOM) should display new tag when user enter new tag in tag input", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogList} />
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
      console.log(debug())
      expect(tagIconNode).toBeInTheDocument()
    })
  })

  test("a14. (EH) should start api request when new tag is entered and url must contain the tag name", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogList} />
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
    expect(api.request).toHaveBeenCalledTimes(2)
    expect((api.request as any).mock.calls[1][0].url).toContain('tags=test-tag')
  })

  test("a15. (EH) should start api request when new keyword is entered and url must contain the keyword", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogList} />
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
    expect(api.request).toHaveBeenCalledTimes(2)
    expect((api.request as any).mock.calls[1][0].url).toContain('keyword=test-keyword')
  })

  test("a16 (EH) should start api request when new startDate is entered and url must contain the startDate ", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogList} />
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
    expect(api.request).toHaveBeenCalledTimes(2)
    expect((api.request as any).mock.calls[1][0].url).toContain('startDate=2019-11-13')
  })

  test("a17. (EH) should start api request when new endDate is entered and url must contain the endDate", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogList} />
      )
      await waitForElement(() => getByText('there is no blog based on the your sort & filter'))
      const sortInput = getByLabelText('End Date')

      fireEvent.change(sortInput,
        {
          target:
          {
            value: '11/13/2019',
          },
        })

    })
    expect(api.request).toHaveBeenCalledTimes(2)
    expect((api.request as any).mock.calls[1][0].url).toContain('endDate=2019-11-13')
  })

  test("a18. (EH) should start api request when new sort is selected and url must contain the sort", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogList} />
      )
      await waitForElement(() => getByText('there is no blog based on the your sort & filter'))
      const sortInput = getByLabelText('Title Desc')

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

  test("a19. (Route) should route user to specified blog detail page when one of blog is clicked (just only check url string at Link component)", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogList} />
      )
      const blogItemList = await waitForElement(() => getAllByRole('blog-item'))
      expect(blogItemList[0].getAttribute('href')).toBe('/blogs/1')

    })
  })

  test("a20.  (EH) should start api request when new page number is click and url must contain the number", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogList} />
      )
      const thirdPageBtn = await waitForElement(() => getByText('3'))
      fireEvent.click(thirdPageBtn)
    })
    expect(api.request).toHaveBeenCalledTimes(2)
    expect((api.request as any).mock.calls[1][0].url).toContain('page=3')
  })

  test("a21. (EH) should start api request when last page number is click and url must contain the number", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogList} />
      )
      const lastPageBtn = await waitForElement(() => getByRole('last-page-btn'))
      fireEvent.click(lastPageBtn)
    })
    expect(api.request).toHaveBeenCalledTimes(2)
    expect((api.request as any).mock.calls[1][0].url).toContain('page=500&limit=20')
  })

  test("a22. (cache) should cache response data in localStorage after request", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogList} />
      )
      await waitForElement(() => getAllByRole('blog-item'))
    })
    const path = (api.request as any).mock.calls[0][0].url
    expect(localStorage.getItem(path)).not.toBeNull()
  })

  test("a23. (cache) should use cached data when request to the same endpoint (with queryString)", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogList} />
      )
      await waitForElement(() => getAllByRole('blog-item'))
      fireEvent.click(getByRole('refresh-icon'))
    })
    const path = (api.request as any).mock.calls[0][0].url
    expect(api.request).toHaveBeenCalledTimes(1)
  })

  describe('bl-c1: <= tablet screen size', () => {

    beforeAll(() => {
      console.log('bl-c1: beforeAll: small screen size')
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.tabletSize })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
      console.log('bl-c1: beforeEach: small screen size ')
    })

    /** test for use case for small screen size here**/
    test("ltt1. (responsive) should display sort filter icon", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
          <ContextWrapperComponent component={BlogList} />
        )

        expect(getByRole('filter-sort-icon')).toBeInTheDocument()
      })
    })

    test("ltt2. (responsive) should not display sort filter aside ", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText, queryByRole } = render(
          <ContextWrapperComponent component={BlogList} />
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
          <ContextWrapperComponent component={BlogList} />
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

    afterEach(() => {
      console.log('bl-c1: afterEach: small screen size ')
    })

    afterAll(() => {
      console.log('bl-c1: afterAll: small screen size ')
    })

  })

  describe('bl-c1: > tablet screen size', () => {

    beforeAll(() => {
      console.log('bl-c1: beforeAll: medium screen size')
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.tabletSize + 1 })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
      console.log('bl-c1: beforeEach: medium screen size')
    })

    /** test for use case for medium screen size here**/
    test("gtt1. (responsive) should not display sort filter icon", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
          <ContextWrapperComponent component={BlogList} />
        )

        await wait(() => {
          const filterSortAside = queryByRole(container, 'filter-sort-icon')
          expect(filterSortAside).toBeNull()
        })
      })
    })

    afterEach(() => {
      console.log('bl-c1: afterEach: medium screen size')
    })

    afterAll(() => {
      console.log('bl-c1: afterAll: medium screen size')
    })

  })

  describe('bl-c1: > laptop screen size', () => {

    beforeAll(() => {
      console.log('bl-c1: beforeAll: medium screen size')
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.laptopSize + 1 })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
      console.log('bl-c1: beforeEach: medium screen size')
    })

    test("gttlt1. (responsive) should display sort filter aside ", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
          <ContextWrapperComponent component={BlogList} />
        )

        await wait(() => {
          expect(getByRole('filter-sort-aside')).toBeInTheDocument()
        })
      })
    })


    afterEach(() => {
      console.log('bl-c1: afterEach: medium screen size')
    })

    afterAll(() => {
      console.log('bl-c1: afterAll: medium screen size')
    })

  })

  afterEach(() => {
    console.log('bl-c1: afterEach ')
  })

  afterAll(() => {
    console.log('bl-c1: afterAll ')
  })

})

