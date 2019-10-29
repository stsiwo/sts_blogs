import { Action, AnyAction } from "redux";

/** action type type **/
export enum ActionTypeEnum {
  TOGGLE_LOGIN_FORM,
  TOGGLE_SIGNUP_FORM,
  TOGGLE_NAV_BAR,
  TOGGLE_FILTER_SORT_BAR,
  TOGGLE_LOGIN_STATUS,
}

/** action type **/
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

export declare type ToggleLoginStatusActionType = AppActionType & {
  isLogin: boolean
}

/** action creator type **/
export declare type ActionCreatorType = (...args: any[]) => AnyAction

export declare type ToggleLoginFormActionCreatorType = (isLoginFormOpen: boolean) => ToggleLoginFormActionType 

export declare type ToggleSignupFormActionCreatorType = (isSignupFormOpen: boolean) => ToggleSignupFormActionType 

export declare type ToggleNavBarActionCreatorType = (isNavBarOpen: boolean) => ToggleNavBarActionType 

export declare type ToggleFilterSortBarActionCreatorType = (isFilterSortBarOpen: boolean) => ToggleFilterSortBarActionType 

export declare type ToggleLoginStatusActionCreatorType = (isLogin: boolean) => ToggleLoginStatusActionType 
