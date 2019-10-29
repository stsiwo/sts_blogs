import { CaseReducerType } from "./CaseReducerType";
import { UiStateType } from "../../states/types";
import { ToggleLoginFormActionType, ToggleSignupFormActionType, ToggleNavBarActionType, ToggleFilterSortBarActionType } from "../../actions/types";


export const toggleLoginFormCaseReducer: CaseReducerType<UiStateType, ToggleLoginFormActionType> = (ui, action) => {
  ui.isLoginFormOpen = action.isLoginFormOpen
  return ui;
};

export const toggleSignupFormCaseReducer: CaseReducerType<UiStateType, ToggleSignupFormActionType> = (ui, action) => {
  ui.isSignupFormOpen = action.isSignupFormOpen
  return ui;
};

export const toggleNavBarCaseReducer: CaseReducerType<UiStateType, ToggleNavBarActionType> = (ui, action) => {
  ui.isNavBarOpen = action.isNavBarOpen
  return ui;
};

export const toggleFilterSortBarCaseReducer: CaseReducerType<UiStateType, ToggleFilterSortBarActionType> = (ui, action) => {
  ui.isFilterSortBarOpen = action.isFilterSortBarOpen
  return ui;
};
