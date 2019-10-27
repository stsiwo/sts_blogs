import { Action, AnyAction } from "redux";

/** action type type **/
export enum ActionTypeEnum {
  TOGGLE_LOGIN_FORM,
  TOGGLE_SIGNUP_FORM,
  TOGGLE_NAV_BAR,
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

/** action creator type **/
export declare type ActionCreatorType = (...args: any[]) => AnyAction

export declare type ToggleLoginFormActionCreatorType = (isLoginFormOpen: boolean) => ToggleLoginFormActionType 

export declare type ToggleSignupFormActionCreatorType = (isSignupFormOpen: boolean) => ToggleSignupFormActionType 

export declare type ToggleNavBarActionCreatorType = (isNavBarOpen: boolean) => ToggleNavBarActionType 
