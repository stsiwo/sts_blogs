import { Action, AnyAction } from "redux";
import { TagType } from "../domain/tag/TagType";

/** action type type **/
export enum ActionTypeEnum {
  /** ui **/
  TOGGLE_LOGIN_FORM,
  TOGGLE_SIGNUP_FORM,
  TOGGLE_NAV_BAR,
  TOGGLE_FILTER_SORT_BAR,
  /** app **/
  TOGGLE_LOGIN_STATUS,
  /** domain **/
  ASSIGN_TAGS,
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

/** domain **/
export declare type AssignTagsActionType = AppActionType & {
  tags: TagType[]
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

/** domain **/
export declare type AssignTagsActionCreatorType = (tags: TagType[]) => AssignTagsActionType 
