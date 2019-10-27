import { ToggleLoginFormActionCreatorType, ToggleSignupFormActionCreatorType, ToggleNavBarActionCreatorType, ActionTypeEnum } from "./types";


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
