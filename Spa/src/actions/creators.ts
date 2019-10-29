import { ToggleLoginFormActionCreatorType, ToggleSignupFormActionCreatorType, ToggleNavBarActionCreatorType, ActionTypeEnum, ToggleLoginStatusActionCreatorType, ToggleFilterSortBarActionCreatorType } from "./types";


export const toggleLoginFormActionCreator: ToggleLoginFormActionCreatorType = (isLoginFormOpen) => ({
  type: ActionTypeEnum.TOGGLE_LOGIN_FORM, 
  isLoginFormOpen: isLoginFormOpen
})


export const toggleSignupFormActionCreator: ToggleSignupFormActionCreatorType = (isSignupFormOpen) => ({
  type: ActionTypeEnum.TOGGLE_SIGNUP_FORM, 
  isSignupFormOpen: isSignupFormOpen
})

export const toggleNavBarActionCreator: ToggleNavBarActionCreatorType = (isNavBarOpen) => ({
  type: ActionTypeEnum.TOGGLE_NAV_BAR,
  isNavBarOpen: isNavBarOpen
})

export const toggleFilterSortBarActionCreator: ToggleFilterSortBarActionCreatorType = (isFilterSortBarOpen) => ({
  type: ActionTypeEnum.TOGGLE_FILTER_SORT_BAR,
  isFilterSortBarOpen: isFilterSortBarOpen
})

export const toggleLoginStatusActionCreator: ToggleLoginStatusActionCreatorType = (isLogin) => ({
  type: ActionTypeEnum.TOGGLE_LOGIN_STATUS,
  isLogin: isLogin
})
