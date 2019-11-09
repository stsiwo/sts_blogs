import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { api } from '../../../../../src/requests/api';
import { blogGET200NonEmptyResponse, blogGET200EmptyResponse } from '../../../../requests/fixtures';
import { ContextWrapperComponent } from '../../../fixtures';
import BlogManagement from '../../../../../src/UI/Content/Setting/BlogManagement/BlogManagement';
import { CssGlobalContextDefaultState } from '../../../../../src/UI/Base/Context/CssGlobalContext/CssGlobalContextDefaultState';
jest.mock('../../../../../src/requests/api')


describe('bm-c1: BlogManagement Component testing', () => {

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
   *
   * ** <= tablet **
   *
   * ltt1. (responsive) should display sort filter icon
   * ltt2. (responsive) should not display sort filter aside 
   * ltt3. (EH) should display sort filter aisde when sort filter icon is clicked
   * ltt4. (lifecycle) should not the request when this component is updated
   *
   * ** > tablet **
   *
   * gtt1. (responsive) should not display sort filter icon
   * gtt2. (responsive) should display sort filter aside 
   *
   **/

  beforeAll(() => {
    console.log('bm-c1: beforeAll ')
  })

  beforeEach(() => {
    console.log('bm-c1: beforeEach ')
  })

  /** test for use case which does not matter screen size  here**/
  test('a2. (lifecycle) should start api request when this component is mounted', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
    })
    expect(api.request).toHaveBeenCalled()
  })

  test("a4. (EH) should start api request when 'refresh' button is clicked", async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    // should replace mock with real one
    api.CancelToken.source = jest.fn().mockReturnValue('cancel-token')
    await act(async () => {
      const { getByText, getByRole, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth/>
      )

      // wait for initial fetch finish and render blog list
      await waitForElement(() => getAllByRole('blog-item'))

      fireEvent.click(getByText('refresh'))

      await waitForElement(() => getAllByRole('blog-item'))

    })
    expect(api.request).toHaveBeenCalledTimes(2)

  })

  test("a5. (EH) should cancel api request when 'cancel' button is clicked after 'refresh' button is clicked", async () => {

    // api.request = jest.fn()
    //   .mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse)
    //     .then((data) => new Promise(resolve => setTimeout(() => {
    //       resolve(data)
    //     }, 3000))))

    expect(1).toBe(0)

  })

  test("a6. (EH) should start api request with new limit value when page limit selector is changed", async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} />
      )
      await waitForElement(() => getAllByRole('blog-item'))

      fireEvent.change(getByRole('page-limit-select'), {
        target: {
          value: '40'
        }
      })
    })
    expect(api.request).toHaveBeenCalledTimes(2)
    expect((api.request as any).mock.calls[1][0].url).toContain('limit=40')
  })

  test("a7. (responsive) should display a list of blog after successful api request when blog exists", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} />
      )
      const blogListNode = await waitForElement(() => getAllByRole('blog-item'))
      expect(blogListNode.length).toBeGreaterThan(0)
    })
  })

  test("a8. (responsive) should display 'no blog' message after successful api request when blog does not exist", async () => {
    (api.request as any).mockClear()
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    console.log(api.request)
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} />
      )
      await waitForElement(() => getByText('blogs are empty'))
      expect(getByText('blogs are empty')).toBeInTheDocument()
    })
  })

  test("a9. (responsive) (guest) should display 'member only' message at 'create new blog' button", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} />
      )
      await waitForElement(() => getByText('blogs are empty'))
      expect(getByText('Member Only')).toBeInTheDocument()
    })
  })

  test("a10. (Route) (guest) should route guest user to login/signup when 'create new blog' is clicked (just only check url string at Link component)", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} />
      )
      expect(document.getElementsByClassName('aside-new-blog-link')[0].getAttribute('href')).toBe('/login')

    })
  })

  test("a11. (DOM) (member) should not display 'member only' message at 'create new blog' button", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      const memberOnlyNode = queryByText(container, 'Member Only')
      expect(memberOnlyNode).toBeNull()

    })
  })

  test("a12. (Route) (member) should route member user to /blogs/new  when 'create new blog' is clicked (just only check url string at Link component)", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={BlogManagement} isAuth />
      )
      expect(document.getElementsByClassName('aside-new-blog-link')[0].getAttribute('href')).toBe('/new')
    })
  })

  test("a13. (DOM) should display new tag when user enter new tag in tag input", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogManagement} />
      )
      await waitForElement(() => getByText('blogs are empty'))
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
        <ContextWrapperComponent component={BlogManagement} />
      )
      await waitForElement(() => getByText('blogs are empty'))
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
        <ContextWrapperComponent component={BlogManagement} />
      )
      await waitForElement(() => getByText('blogs are empty'))
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
        <ContextWrapperComponent component={BlogManagement} />
      )
      await waitForElement(() => getByText('blogs are empty'))
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
        <ContextWrapperComponent component={BlogManagement} />
      )
      await waitForElement(() => getByText('blogs are empty'))
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
        <ContextWrapperComponent component={BlogManagement} />
      )
      await waitForElement(() => getByText('blogs are empty'))
      const sortInput = getByLabelText('Title Desc')

      /** 
       * #BUG??: fireEvent.change does not trigger event on radio input
       **/
      fireEvent.change(sortInput,
        {
          target:
          {
            value: '3',
          },
        })

    })
    expect(api.request).toHaveBeenCalledTimes(2)
    expect((api.request as any).mock.calls[1][0].url).toContain('sort=3')
  })

  test("a19. (Route) should route user to specified blog detail page when one of blog is clicked (just only check url string at Link component)", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogManagement} />
      )
      await waitForElement(() => getAllByRole('blog-item'))
    })
    expect(document.getElementsByClassName('blog-list-items-item-wrapper')[0].getAttribute('href')).toBe('/blog/1')
  })

  test("a20.  (EH) should start api request when new page number is click and url must contain the number", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogManagement} />
      )
      const thirdPageBtn = await waitForElement(() => getByText('3'))
      fireEvent.click(thirdPageBtn)
    })
    expect(api.request).toHaveBeenCalledTimes(2)
    expect((api.request as any).mock.calls[1][0].url).toContain('offset=40')
  })

  test("a21. (EH) should start api request when last page number is click and url must contain the number", async () => {
    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
        <ContextWrapperComponent component={BlogManagement} />
      )
      const lastPageBtn = await waitForElement(() => getByRole('last-page-btn'))
      fireEvent.click(lastPageBtn)
    })
    expect(api.request).toHaveBeenCalledTimes(2)
    expect((api.request as any).mock.calls[1][0].url).toContain('offset=9980')
  })

  describe('bm-c1: <= tablet screen size', () => {

    beforeAll(() => {
      console.log('bm-c1: beforeAll: small screen size')
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.tabletSize })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
      console.log('bm-c1: beforeEach: small screen size ')
    })

    /** test for use case for small screen size here**/
    test("ltt1. (responsive) should display sort filter icon", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
          <ContextWrapperComponent component={BlogManagement} />
        )

        expect(getByRole('filter-sort-icon')).toBeInTheDocument()
      })
    })

    test("ltt2. (responsive) should not display sort filter aside ", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
          <ContextWrapperComponent component={BlogManagement} />
        )

        await wait(() => {
          const filterSortAside = queryByRole(container, 'filter-sort-aside')
          expect(filterSortAside).toBeNull()
        })
      })
    })

    test("ltt3.  (EH) should display sort filter aisde when sort filter icon is clicked", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
          <ContextWrapperComponent component={BlogManagement} />
        )
        const filterSortIcon = getByRole('filter-sort-icon')
        fireEvent.click(filterSortIcon)

        const filterSortAside = await waitForElement(() => getByRole('filter-sort-aside'))
        await wait(() => {
          expect(filterSortAside).toBeInTheDocument()
        })
      })
    })

    test("ltt4. (lifecycle) should not the request when this component is updated", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
          <ContextWrapperComponent component={BlogManagement} />
        )
        const filterSortIcon = getByRole('filter-sort-icon')
        fireEvent.click(filterSortIcon) // this is the cause of async time out

        const filterSortAside = await waitForElement(() => getByRole('filter-sort-aside'))
        expect(api.request).toHaveBeenCalledTimes(1)
      })
    })


    afterEach(() => {
      console.log('bm-c1: afterEach: small screen size ')
    })

    afterAll(() => {
      console.log('bm-c1: afterAll: small screen size ')
    })

  })

  describe('bm-c1: > tablet screen size', () => {

    beforeAll(() => {
      console.log('bm-c1: beforeAll: medium screen size')
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: CssGlobalContextDefaultState.tabletSize + 1 })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
      console.log('bm-c1: beforeEach: medium screen size')
    })

    /** test for use case for medium screen size here**/
    test("gtt1. (responsive) should not display sort filter icon", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
          <ContextWrapperComponent component={BlogManagement} />
        )

        await wait(() => {
          const filterSortAside = queryByRole(container, 'filter-sort-icon')
          expect(filterSortAside).toBeNull()
        })
      })
    })

    test("gtt2. (responsive) should display sort filter aside ", async () => {
      api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))

      await act(async () => {
        const { getByText, getByRole, container, asFragment, debug, getAllByRole, getByLabelText } = render(
          <ContextWrapperComponent component={BlogManagement} />
        )

        await wait(() => {
          expect(getByRole('filter-sort-aside')).toBeInTheDocument()
        })
      })
    })


    afterEach(() => {
      console.log('bm-c1: afterEach: medium screen size')
    })

    afterAll(() => {
      console.log('bm-c1: afterAll: medium screen size')
    })

  })

  afterEach(() => {
    console.log('bm-c1: afterEach ')
  })

  afterAll(() => {
    console.log('bm-c1: afterAll ')
  })

})


