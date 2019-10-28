import * as React from 'react'
import { mount } from 'enzyme'
import Header from '../../../src/UI/Header/Header'
import { prettyConsole } from '../../../src/utils'
import { CssGlobalContext } from '../../../src/UI/Base/Context/CssGlobalContext/CssGlobalContext';
import { CssGlobalContextDefaultState } from '../../../src/UI/Base/Context/CssGlobalContext/CssGlobalContextDefaultState';
import { Provider } from 'react-redux';
import { store } from '../../../src/configs/storeConfig'
import MenuToggleIcon from '../../../src/UI/Header/MenuToggleIcon/MenuToggleIcon';
import { getAllContextComponent } from '../fixtures';


describe('mti-c1: MenuToogleIcon Component testing', () => {

  beforeAll(() => {
    console.log('mti-c1: beforeAll ')
  })

  beforeEach(() => {
    console.log('mti-c1: beforeEach ')
  })

  /** test for use case which does not matter screen size  here**/

  describe('mti-c1: small screen size', () => {

    beforeAll(() => {
      console.log('mti-c1: beforeAll: small screen size')
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 320 })
      window.dispatchEvent(new Event('resize'));
    })

    beforeEach(() => {
      console.log('mti-c1: beforeEach: small screen size ')
    })

    /** test for use case for small screen size here**/
    test('small screen size proto test', () => {
      const wrapper = mount(getAllContextComponent(Header))
      const menuToggleIcon = wrapper.find('i.header-menu-toggle-icon')

      console.log(wrapper.debug())

      expect(wrapper.find('ul.header-menu-ul').exists()).toBeFalsy()

      menuToggleIcon.simulate('click')
      wrapper.update()

      const navBarComponent = wrapper.find('div.header-menu-wrapper')

      expect(wrapper.find('ul.header-menu-ul').exists()).toBeTruthy()
    })

    afterEach(() => {
      console.log('mti-c1: afterEach: small screen size ')
    })

    afterAll(() => {
      console.log('mti-c1: afterAll: small screen size ')
    })

  })

  describe('mti-c1: medium screen size', () => {

    beforeAll(() => {
      console.log('mti-c1: beforeAll: medium screen size')
    })

    beforeEach(() => {
      console.log('mti-c1: beforeEach: medium screen size')
    })

    /** test for use case for medium screen size here**/

    afterEach(() => {
      console.log('mti-c1: afterEach: medium screen size')
    })

    afterAll(() => {
      console.log('mti-c1: afterAll: medium screen size')
    })

  })

  describe('mti-c1: large screen size', () => {

    beforeAll(() => {
      console.log('mti-c1: beforeAll: large screen size')
    })

    beforeEach(() => {
      console.log('mti-c1: beforeEach: large screen size')
    })

    /** test for use case for large screen size here**/

    afterEach(() => {
      console.log('mti-c1: afterEach: large screen size')
    })

    afterAll(() => {
      console.log('mti-c1: afterAll: large screen size')
    })

  })

  afterEach(() => {
    console.log('mti-c1: afterEach ')
  })

  afterAll(() => {
    console.log('mti-c1: afterAll ')
  })

})
