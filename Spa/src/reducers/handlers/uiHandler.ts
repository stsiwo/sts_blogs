import { HandlerType } from "./types";
import { UiStateType } from "../../states/types";
import { actions } from "../../actions/actions";
import { toggleLoginFormCaseReducer, toggleSignupFormCaseReducer, toggleNavBarCaseReducer } from "../caseReducers/uiCaseReducers";

export const uiHandler: HandlerType<UiStateType> = {
    [actions.TOGGLE_LOGIN_FORM]: toggleLoginFormCaseReducer,
    [actions.TOGGLE_SIGNUP_FORM]: toggleSignupFormCaseReducer,
    [actions.TOGGLE_NAV_BAR]: toggleNavBarCaseReducer,
  }
