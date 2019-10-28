import { CaseReducerType } from "./CaseReducerType";
import { UiStateType, AppStateType } from "../../states/types";
import { ToggleLoginFormActionType, ToggleSignupFormActionType, ToggleNavBarActionType, ToggleLoginStatusActionType } from "../../actions/types";


export const toggleLoginStatusCaseReducer: CaseReducerType<AppStateType, ToggleLoginStatusActionType> = (app, action) => {
  app.isLogin = action.isLogin
  return app;
};

