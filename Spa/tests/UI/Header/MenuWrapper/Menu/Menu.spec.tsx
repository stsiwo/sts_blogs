import * as React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import { toggleLoginStatusActionCreator, toggleNavBarActionCreator } from '../../../../../src/actions/creators';
import { store } from '../../../../../src/configs/storeConfig';
import { getAllContextComponent } from '../../../fixtures';
import Menu from '../../../../../src/UI/Header/MenuWrapper/Menu/Menu';


describe('m-c1: Menu Component testing', () => {

  beforeAll(() => {
    console.log('m-c1: beforeAll ')
  })

  beforeEach(() => {
    console.log('m-c1: beforeEach ')
  })

  /** test for use case which does not matter screen size  here**/

  describe('m-c1: small screen size', () => {

    beforeAll(() => {
      console.log('m-c1: beforeAll: small screen size')
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 320 })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
      console.log('m-c1: beforeEach: small screen size ')
    })

    /** test for use case for small screen size here**/
    describe('m-c1: NavBar opened', () => {

      beforeAll(() => {
        console.log('m-c1: beforeAll: NavBar opened')
        store.dispatch(toggleNavBarActionCreator(true))
      })

      test('should display Login and Signup item to the menu when user is not logged in', () => {
          const wrapper = mount(getAllContextComponent(Menu))
          const aElementList = wrapper.find('a.header-menu-li-link')
          expect(aElementList.findWhere(c => c.text().localeCompare('Signup') == 0).exists()).toBeTruthy()
          expect(aElementList.findWhere(c => c.text().localeCompare('Login') == 0).exists()).toBeTruthy()
      })

      describe('m-c1: user is logined', () => {
        
        beforeAll(() => {
          console.log('m-c1: beforeAll: user is logined')
          store.dispatch(toggleLoginStatusActionCreator(true))
        })

        test('should display Logout Menu item on the menu', () => {
          const wrapper = mount(getAllContextComponent(Menu))
          const aElementList = wrapper.find('a.header-menu-li-link')
          expect(aElementList.findWhere(c => c.text().localeCompare('Logout') == 0).exists()).toBeTruthy()
        })

        afterAll(() => {
          console.log('m-c1: afterAll: user logged out')
          store.dispatch(toggleLoginStatusActionCreator(false))
        })

      })

      afterAll(() => {
        console.log('m-c1: afterAll: NavBar closed')
        store.dispatch(toggleNavBarActionCreator(false))
      })


    })

    afterEach(() => {
      console.log('m-c1: afterEach: small screen size ')
    })

    afterAll(() => {
      console.log('m-c1: afterAll: small screen size ')
    })

  })

  describe('m-c1: medium screen size', () => {

    beforeAll(() => {
      console.log('m-c1: beforeAll: medium screen size')
    })

    beforeEach(() => {
      console.log('m-c1: beforeEach: medium screen size')
    })

    /** test for use case for medium screen size here**/

    afterEach(() => {
      console.log('m-c1: afterEach: medium screen size')
    })

    afterAll(() => {
      console.log('m-c1: afterAll: medium screen size')
    })

  })

  describe('m-c1: large screen size', () => {

    beforeAll(() => {
      console.log('m-c1: beforeAll: large screen size')
    })

    beforeEach(() => {
      console.log('m-c1: beforeEach: large screen size')
    })

    /** test for use case for large screen size here**/

    afterEach(() => {
      console.log('m-c1: afterEach: large screen size')
    })

    afterAll(() => {
      console.log('m-c1: afterAll: large screen size')
    })

  })

  afterEach(() => {
    console.log('m-c1: afterEach ')
  })

  afterAll(() => {
    console.log('m-c1: afterAll ')
  })

})

