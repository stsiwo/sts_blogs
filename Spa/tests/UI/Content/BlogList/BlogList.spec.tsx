import { CssGlobalContextDefaultState } from "../../../../src/UI/Base/Context/CssGlobalContext/CssGlobalContextDefaultState";
import { mount } from "enzyme";
import { getAllContextComponent, ContextWrapperComponent } from "../../fixtures";
import BlogList from "../../../../src/UI/Content/BlogList/BlogList";
import { AuthContext } from "../../../../src/UI/Base/Context/AuthContext/AuthContext";
import * as React from 'react'
import { api } from "../../../../src/requests/api";
import { blogGET200NonEmptyResponse } from "../../../requests/fixtures";
import { act } from 'react-dom/test-utils';
jest.mock('../../../../src/requests/api')


describe('bl-c1: MenuToogleIcon Component testing', () => {

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
   * a3. (lifecycle) should not the request when this component is updated
   * a4. (EH) should start api request when 'refresh' button is clicked
   * a5. (EH) should cancel api request when 'cancel' button is clicked after 'refresh' button is clicked (need to impl; maybe switch 'refresh
   * a6. (EH) should start api request with new limit value when page limit selector is changed
   * a7. (responsive) should display a list of blog after successful api request when blog exists
   * a8. (responsive) should display 'no blog' message after successful api request when blog does not exist
   * a9. (responsive) (guest) should display 'member only' message at 'create new blog' button
   * a10. (Route) (guest) should route guest user to login/signup when 'create new blog' is clicked
   * a10. (responsive) (member) should not display 'member only' message at 'create new blog' button
   * a11. (Route) (member) should route member user to /blogs/new  when 'create new blog' is clicked
   * a12. (EH) should start api request when new tag is entered and url must contain the tag name
   * a13. (EH) should start api request when new keyword is entered and url must contain the keyword 
   * a14. (EH) should start api request when new startDate is entered and url must contain the startDate 
   * a15. (EH) should start api request when new endDate is entered and url must contain the endDate 
   * a16. (EH) should start api request when new sort is selected and url must contain the sort 
   * a17. (Route) should route user to specified blog detail page when one of blog is clicked
   * a18. (EH) should start api request when new page number is click and url must contain the number
   * a19. (EH) should start api request when 1st page number is click and url must contain the number
   * a20. (EH) should start api request when last page number is click and url must contain the number
   *
   * ** <= tablet **
   *
   * 2. (responsive) should display sort filter icon
   * 3. (responsive) should not display sort filter aside 
   * 4. (EH) should display sort filter aisde when sort filter icon is clicked
   *
   * ** > tablet **
   *
   * gtt1. (responsive) should not display sort filter icon
   * gtt2. (responsive) should display sort filter aside 
   *
   **/

  beforeAll(() => {
    console.log('bl-c1: beforeAll ')
  })

  beforeEach(() => {
    console.log('bl-c1: beforeEach ')


    //menuToggleIcon.simulate('click')
    //wrapper.update()

    //const navBarComponent = wrapper.find('div.header-menu-wrapper')

    //expect(wrapper.find('ul.header-menu-ul').exists()).toBeTruthy()
  })

  /** test for use case which does not matter screen size  here**/
  test('a2. (lifecycle) should start api request when this component is mounted', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    const wrapper = mount(<ContextWrapperComponent component={BlogList} />)

    await Promise.resolve(); // to wait any async function inside component is done

    expect(api.request).toHaveBeenCalled()
  })

  test('a3. (lifecycle) should not the request when this component is updated', async () => {

    api.request = jest.fn().mockReturnValue(Promise.resolve(blogGET200NonEmptyResponse))
    const wrapper = mount(<ContextWrapperComponent component={BlogList} />)

    await Promise.resolve(); // to wait any async function inside component is done

    wrapper.update() // force update to make sure api request is not called when updating

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
    test('small screen size proto test', () => {
      expect(false).toBeTruthy()
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

