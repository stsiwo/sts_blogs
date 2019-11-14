import { HandlerType } from "./types";
import { UiStateType } from "states/types";
import { toggleLoginFormCaseReducer, toggleSignupFormCaseReducer, toggleNavBarCaseReducer, toggleFilterSortBarCaseReducer } from "../caseReducers/uiCaseReducers";
import { ActionTypeEnum } from "actions/types";

export const uiHandler: HandlerType<UiStateType> = {
    [ActionTypeEnum.TOGGLE_LOGIN_FORM]: toggleLoginFormCaseReducer,
    [ActionTypeEnum.TOGGLE_SIGNUP_FORM]: toggleSignupFormCaseReducer,
    [ActionTypeEnum.TOGGLE_NAV_BAR]: toggleNavBarCaseReducer,
    [ActionTypeEnum.TOGGLE_FILTER_SORT_BAR]: toggleFilterSortBarCaseReducer,
  }
