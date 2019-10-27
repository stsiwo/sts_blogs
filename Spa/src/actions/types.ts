import { Action } from "redux";

export declare type ActionTypeType = {
  TOGGLE_LOGIN_FORM: string
  TOGGLE_SIGNUP_FORM: string
  TOGGLE_NAV_BAR: string
}

// base action type which only allow type is one of ActionTypeType
export declare type AppActionType = Action<keyof ActionTypeType>

export declare type ToggleLoginFormActionType = AppActionType & {
  isLoginFormOpen: boolean
}

export declare type ToggleSignupFormActionType = AppActionType & {
  isSignupFormOpen: boolean
}

export declare type ToggleNavBarActionType = AppActionType & {
  isNavBarOpen: boolean
}

