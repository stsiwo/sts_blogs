import { ToggleLoginFormActionCreatorType, ToggleSignupFormActionCreatorType, ToggleNavBarActionCreatorType, ActionTypeEnum, ToggleLoginStatusActionCreatorType, ToggleFilterSortBarActionCreatorType, AssignTagsActionCreatorType, AssignUserActionCreatorType, AssignBlogsActionCreatorType } from "./types";


/** ui **/
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

/** app **/
export const toggleLoginStatusActionCreator: ToggleLoginStatusActionCreatorType = (isLogin) => ({
  type: ActionTypeEnum.TOGGLE_LOGIN_STATUS,
  isLogin: isLogin
})

/** domain **/
export const assignTagsActionCreator: AssignTagsActionCreatorType = (tags) => ({
  type: ActionTypeEnum.ASSIGN_TAGS,
  tags: tags
})

export const assignUserActionCreator: AssignUserActionCreatorType = (user) => ({
  type: ActionTypeEnum.ASSIGN_USER,
  user: user
})

export const assignBlogsActionCreator: AssignBlogsActionCreatorType = (blogs) => ({
  type: ActionTypeEnum.ASSIGN_BLOGS,
  blogs: blogs
})
