import { createStore } from "redux";
import { rootReducer } from "reducers/rootReducer";
import { initialState } from "states/state";
import { ToggleLoginFormActionType, ToggleSignupFormActionType, ToggleNavBarActionType, ActionTypeEnum, ToggleLoginStatusActionType, ToggleFilterSortBarActionType, AssignTagsActionType, AssignUserActionType, AssignBlogsActionType, ToggleBlogsFetchingFlagActionType, ToggleTagsFetchingFlagActionType } from "actions/types";
import { prettyConsole } from "../../src/utils";
import { toggleLoginStatusActionCreator, toggleFilterSortBarActionCreator, assignTagsActionCreator, assignUserActionCreator, assignBlogsActionCreator, toggleBlogsFetchingFlagActionCreator, toggleTagsFetchingFlagActionCreator } from 'actions/creators'
import { StateType } from "states/types";
import { getTagTestData } from "../data/TagFaker";
import { getUserTestData } from "../data/UserFaker";
import { getBlogTestData } from "../data/BlogFaker";


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

  it('should update ui.isFilterSortBarOpen state when that action is dispatched', () => {

    let store = createStore(rootReducer)

    let action: ToggleFilterSortBarActionType = toggleFilterSortBarActionCreator(true)
    store.dispatch(action)

    expect(store.getState().ui.isFilterSortBarOpen).toEqual(true)
  })

  it('should update app.isLogin state when that action is dispatched', () => {

    let store = createStore(rootReducer)

    let action: ToggleLoginStatusActionType = toggleLoginStatusActionCreator(true)
    store.dispatch(action)

    expect(store.getState().app.isLogin).toEqual(true)
  })

  it('should update app.isTagsFetching state when that action is dispatched', () => {

    let store = createStore(rootReducer)

    let action: ToggleTagsFetchingFlagActionType = toggleTagsFetchingFlagActionCreator(true)
    console.log(action)
    store.dispatch(action)

    expect(store.getState().app.isTagsFetching).toEqual(true)
  })

  it('should update app.isBlogsFetching state when that action is dispatched', () => {

    let store = createStore(rootReducer)

    let action: ToggleBlogsFetchingFlagActionType = toggleBlogsFetchingFlagActionCreator(true)
    console.log(action)
    store.dispatch(action)

    expect(store.getState().app.isBlogsFetching).toEqual(true)
  })

  it('should update domain.tags state when that action is dispatched', () => {

    let store = createStore(rootReducer)

    let tags = getTagTestData()
    let action: AssignTagsActionType = assignTagsActionCreator(tags)
    store.dispatch(action)

    expect(store.getState().domain.tags).toEqual(tags)
  })

  it('should update domain.user state when that action is dispatched', () => {

    let store = createStore(rootReducer)

    let user = getUserTestData(1)[0]
    let action: AssignUserActionType = assignUserActionCreator(user)
    store.dispatch(action)

    expect(store.getState().domain.user).toEqual(user)
  })

  it('should update domain.blogs state when that action is dispatched', () => {

    let store = createStore(rootReducer)

    let blogs = getBlogTestData()
    let action: AssignBlogsActionType = assignBlogsActionCreator(blogs)
    store.dispatch(action)

    expect(store.getState().domain.blogs).toEqual(blogs)
  })
})
