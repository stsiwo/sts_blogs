import { Action, AnyAction } from "redux";
import { TagType } from "domain/tag/TagType";
import { UserType } from "domain/user/UserType";
import { BlogType } from "domain/blog/BlogType";

/** action type type **/
export enum ActionTypeEnum {
  /** ui **/
  TOGGLE_LOGIN_FORM = 'TOGGLE_LOGIN_FORM',
  TOGGLE_SIGNUP_FORM = 'TOGGLE_SIGNUP_FORM',
  TOGGLE_NAV_BAR = 'TOGGLE_NAV_BAR',
  TOGGLE_FILTER_SORT_BAR = 'TOGGLE_FILTER_SORT_BAR',
  /** app **/
  TOGGLE_LOGIN_STATUS = 'TOGGLE_LOGIN_STATUS',
  TOGGLE_BLOGS_FETCHING_FLAG = 'TOGGLE_BLOGS_FETCHING_FLAG',
  TOGGLE_TAGS_FETCHING_FLAG = 'TOGGLE_TAGS_FETCHING_FLAG',
  /** domain **/
  ASSIGN_TAGS = 'ASSIGN_TAGS',
  ASSIGN_USER = 'ASSIGN_USER',
  ASSIGN_BLOGS = 'ASSIGN_BLOGS',
}

/** action type **/
/** ui **/
// base action type which only allow type is one of ActionTypeEnum
export declare type AppActionType = Action<ActionTypeEnum>

export declare type ToggleLoginFormActionType = AppActionType & {
  isLoginFormOpen: boolean
}

export declare type ToggleSignupFormActionType = AppActionType & {
  isSignupFormOpen: boolean
}

export declare type ToggleNavBarActionType = AppActionType & {
  isNavBarOpen: boolean
}

export declare type ToggleFilterSortBarActionType = AppActionType & {
  isFilterSortBarOpen: boolean
}

/** app **/
export declare type ToggleLoginStatusActionType = AppActionType & {
  isLogin: boolean
}

export declare type ToggleBlogsFetchingFlagActionType = AppActionType & {
  isBlogsFetching: boolean
}

export declare type ToggleTagsFetchingFlagActionType = AppActionType & {
  isTagsFetching: boolean
}
/** domain **/
export declare type AssignTagsActionType = AppActionType & {
  tags: TagType[]
}

export declare type AssignUserActionType = AppActionType & {
  user: UserType
}

export declare type AssignBlogsActionType = AppActionType & {
  blogs: BlogType[]
}
/** action creator type **/
export declare type ActionCreatorType = (...args: any[]) => AnyAction

/** ui **/
export declare type ToggleLoginFormActionCreatorType = (isLoginFormOpen: boolean) => ToggleLoginFormActionType 

export declare type ToggleSignupFormActionCreatorType = (isSignupFormOpen: boolean) => ToggleSignupFormActionType 

export declare type ToggleNavBarActionCreatorType = (isNavBarOpen: boolean) => ToggleNavBarActionType 

export declare type ToggleFilterSortBarActionCreatorType = (isFilterSortBarOpen: boolean) => ToggleFilterSortBarActionType 

/** app **/
export declare type ToggleLoginStatusActionCreatorType = (isLogin: boolean) => ToggleLoginStatusActionType 

export declare type ToggleBlogsFetchingFlagActionCreatorType = (isBlogsFetching: boolean) => ToggleBlogsFetchingFlagActionType 

export declare type ToggleTagsFetchingFlagActionCreatorType = (isTagsFetching: boolean) => ToggleTagsFetchingFlagActionType 


/** domain **/
export declare type AssignTagsActionCreatorType = (tags: TagType[]) => AssignTagsActionType 

export declare type AssignUserActionCreatorType = (user: UserType) => AssignUserActionType 

export declare type AssignBlogsActionCreatorType = (blogs: BlogType[]) => AssignBlogsActionType 
