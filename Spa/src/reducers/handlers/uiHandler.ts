import { HandlerType } from "./types";
import { UiStateType } from "../../states/types";
import { actions } from "../../actions/actions";
import { ui1CaseReducer, ui2CaseReducer, ui3CaseReducer } from "../caseReducers/uiCaseReducers";

export const uiHandler: HandlerType<UiStateType> = {
    [actions.UI_1]: ui1CaseReducer,
    [actions.UI_2]: ui2CaseReducer,
    [actions.UI_3]: ui3CaseReducer,
  }
