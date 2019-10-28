import { createStore } from "redux";
import { rootReducer } from "../../src/reducers/rootReducer";
import { initialState } from "../../src/states/state";
import { ToggleLoginFormActionType, ToggleSignupFormActionType, ToggleNavBarActionType, ActionTypeEnum } from "../../src/actions/types";
import { prettyConsole } from "../../src/utils";


describe('rr01_rootReducer', () => {

  it('should have same state as initial state', () => {

    let store = createStore(rootReducer)
    
    expect(store.getState()).toEqual(initialState)
  })

  it('should update ui.isLoginFormOpen state when that action is dispatched', () => {

    let store = createStore(rootReducer)

    let action: ToggleLoginFormActionType = {
      type: ActionTypeEnum.TOGGLE_LOGIN_FORM,
      isLoginFormOpen: false
    }

    store.dispatch(action)

    expect(store.getState().ui.isLoginFormOpen).toEqual(false)
  })
  
  it('should update ui.isSignupFormOpen state when that action is dispatched', () => {

    let store = createStore(rootReducer)

    let action: ToggleSignupFormActionType = {
      type: ActionTypeEnum.TOGGLE_SIGNUP_FORM,
      isSignupFormOpen: false
    }

    store.dispatch(action)

    expect(store.getState().ui.isSignupFormOpen).toEqual(false)
  })

  it('should update ui.isNavBarOpen state when that action is dispatched', () => {

    let store = createStore(rootReducer)

    let action: ToggleNavBarActionType = {
      type: ActionTypeEnum.TOGGLE_NAV_BAR, 
      isNavBarOpen: false
    }

    store.dispatch(action)

    expect(store.getState().ui.isNavBarOpen).toEqual(false)
  })
})
