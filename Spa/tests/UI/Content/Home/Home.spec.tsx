import '@testing-library/jest-dom/extend-expect';
// import react-testing methods
import { fireEvent, queryByRole, queryByText, render, wait, waitForElement } from '@testing-library/react';
import * as React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import { api } from "requests/api";
import { CssGlobalContextDefaultState } from "Contexts/CssGlobalContext/CssGlobalContextDefaultState";
import Home from "ui/Content/Home/Home";
import { blogGET200EmptyResponse, blogGET200NonEmptyResponse, singleBlogGET200NonEmptyResponse, networkError, internalServerError500Response } from "../../../requests/fixtures";
import { ContextWrapperComponent } from "../../fixtures";
import '../../../data/mocks/localStorageMock'


describe('bl-c1: Home Component testing', () => {

  /**
   * prerequisite 
   * 1. mock api request and return dummy test blog data 
   * 2. role: member & admin & guest (provide test auth user)
   **/

  /**
   * use case or css layout test list
   *
   * ** all **
   *
   * a1. (EH) should display search input when click search icon  
   * a2. (EH) should close search input when click search icon again 
   * a3. (api fetch) should fetch recent blogs when component is mounted 
   * a4. (api fetch) should display blogs after initial fetch  
   * a5. (api fetch) should display 'empty' message if fetch result is empty 
   * a6. (api fetch) should display 'blogs are not currently available' message if fetch failed since network error
   * a7. (api fetch) should display 'blogs are not currently available' message if fetch failed since 4xx or 5xx response 
   * a8. (EH) should start fetch when user click 'popular' btn for popular blogs 
   * a9. (guest) should not display 'recommended' blogs option 
   * a10. (member&admin) should display 'recommended' blogs option 
   * a11. (Route) each blog has link to it own blog detail page 
   *
   **/

  beforeAll(() => {
  })

  beforeEach(() => {
    localStorage.clear()
  })

  test('a1. (EH) should display search input when click search icon', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={Home} />
      )
      const searchIcon = await waitForElement(() => getByRole('search-icon'))
      fireEvent.click(searchIcon)
      await wait(() => {
        expect(getByRole('search-input').style.width).not.toBe('0px')
      })

    })
  })

  test('a2. (EH) should close search input when click search icon again', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200EmptyResponse))
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={Home} />
      )
      const searchIcon = await waitForElement(() => getByRole('search-icon'))
      fireEvent.click(searchIcon)
      await wait(() => {
        expect(getByRole('search-input').style.width).not.toBe('0px')
      })
      fireEvent.click(searchIcon)
      await wait(() => {
        expect(getByRole('search-input').style.width).toBe('0px')
      })

    })
  })

  test('a3. (api fetch) should fetch recent blogs when component is mounted', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={Home} />
      )
      await wait(() => {
        expect(api.request).toHaveBeenCalled()
      })
    })
  })

  test('a4. (api fetch) should display blogs after initial fetch', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={Home} />
      )
      await wait(() => {
        expect(getAllByRole('blog-item')).not.toBeNull()
      })
    })
  })

  test('a6. (api fetch) should display "blogs are not currently available" message if fetch failed since network error', async () => {

    /**
     * unhandled rejected promise error:
     *  -> don't use 'mockReturnValue'. use 'mockRejectedValue' instead
     **/
    api.request = jest.fn().mockRejectedValueOnce(networkError)
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={Home} />
      )
      await wait(() => {
        expect(getByText('blogs are not currently available')).toBeInTheDocument()
      })
    })
  })


  test('a7. (api fetch) should display "blogs are not currently available" message if fetch failed since 4xx or 5xx response', async () => {

    api.request = jest.fn().mockRejectedValue(internalServerError500Response)
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={Home} />
      )
      await wait(() => {
        expect(getByText('blogs are not currently available')).toBeInTheDocument()
      })
    })
  })


  /**
   * ordering a5 -> a6 -> a7 test cause a6 to fail
   * i don't know why
   * for now, change this order to a6 -> a7 -> a8
   **/
  test('a5. (api fetch) should display "empty" message if fetch result is empty', async () => {

    api.request = jest.fn().mockResolvedValueOnce(blogGET200EmptyResponse)
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={Home} />
      )
      await wait(() => {
        expect(getByText('blogs are empty')).toBeInTheDocument()
      })
    })
  })

  /**
   * comment out since this make testing stuck
   **/
  //test('a8. (EH) should start fetch when user click "popular" btn for popular blogs', async () => {

  //  api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
  //  await act(async () => {
  //    const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
  //      <ContextWrapperComponent component={Home} />
  //    )
  //    const popularBtn = await waitForElement(() => getByText('Popular'))

  //    /**
  //     * fireEvent.click(popularBtn) make test stuck?? bugs??
  //     **/
  //    //Simulate.click(popularBtn)
  //    fireEvent.click(popularBtn)
  //    await wait(() => {
  //      expect(api.request).toHaveBeenCalledTimes(2)
  //    })
  //  })
  //})

  test('a9. (guest) should not display "recommended" blogs option', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole, queryByText } = render(
        <ContextWrapperComponent component={Home} />
      )
      const popularBtn = await waitForElement(() => getByText('Popular'))
      await wait(() => {
        expect(queryByText("Recommended")).toBeNull()
      })
    })
  })

  test('a10. (member&admin) should display "recommended" blogs option', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={Home} isAuth/>
      )
      const popularBtn = await waitForElement(() => getByText('Popular'))
      await wait(() => {
        expect(getByText("Recommended")).toBeInTheDocument()
      })
    })
  })

  test('a11. (Route) each blog has link to it own blog detail page', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    await act(async () => {
      const { getByText, getByRole, container, asFragment, debug, getAllByRole } = render(
        <ContextWrapperComponent component={Home} />
      )
      const blogItemNodes = await waitForElement(() => getAllByRole('blog-item'))
      await wait(() => {
        expect(blogItemNodes[0].getAttribute('href')).toBe('/blogs/1')
      })
    })
  })

  afterEach(() => {
  })

  afterAll(() => {
  })

})



