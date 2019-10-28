import { HandlerType } from "./types";
import { AppStateType } from "../../states/types";
import { ActionTypeEnum } from "../../actions/types";
import { toggleLoginStatusCaseReducer } from "../caseReducers/appCaseReducer";

export const appHandler: HandlerType<AppStateType> = {
    [ActionTypeEnum.TOGGLE_LOGIN_STATUS]: toggleLoginStatusCaseReducer,
  }

