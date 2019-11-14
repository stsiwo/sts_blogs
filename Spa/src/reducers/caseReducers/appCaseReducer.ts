import { CaseReducerType } from "./CaseReducerType";
import { UiStateType, AppStateType } from "states/types";
import { ToggleLoginFormActionType, ToggleSignupFormActionType, ToggleNavBarActionType, ToggleLoginStatusActionType, ToggleBlogsFetchingFlagActionType, ToggleTagsFetchingFlagActionType } from "actions/types";


export const toggleLoginStatusCaseReducer: CaseReducerType<AppStateType, ToggleLoginStatusActionType> = (app, action) => {
  app.isLogin = action.isLogin
  return app;
};

export const toggleBlogsFetchingFlagCaseReducer: CaseReducerType<AppStateType, ToggleBlogsFetchingFlagActionType> = (app, action) => {
  app.isBlogsFetching = action.isBlogsFetching
  return app;
};

export const toggleTagsFetchingFlagCaseReducer: CaseReducerType<AppStateType, ToggleTagsFetchingFlagActionType> = (app, action) => {
  app.isTagsFetching = action.isTagsFetching
  return app;
};

