import { HandlerType } from "./types";
import { AppStateType } from "../../states/types";
import { ActionTypeEnum } from "../../actions/types";
import { toggleLoginStatusCaseReducer, toggleBlogsFetchingFlagCaseReducer, toggleTagsFetchingFlagCaseReducer } from "../caseReducers/appCaseReducer";

export const appHandler: HandlerType<AppStateType> = {
    [ActionTypeEnum.TOGGLE_LOGIN_STATUS]: toggleLoginStatusCaseReducer,
    [ActionTypeEnum.TOGGLE_BLOGS_FETCHING_FLAG]: toggleBlogsFetchingFlagCaseReducer,
    [ActionTypeEnum.TOGGLE_TAGS_FETCHING_FLAG]: toggleTagsFetchingFlagCaseReducer,
  }

