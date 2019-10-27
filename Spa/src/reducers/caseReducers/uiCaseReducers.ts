import { CaseReducerType } from "./CaseReducerType";
import { UiStateType } from "../../states/types";
import { Ui1ActionType, Ui2ActionType, Ui3ActionType } from "../../actions/types";


export const ui1CaseReducer: CaseReducerType<UiStateType, Ui1ActionType> = (ui, action) => {
  ui.ui1 = !ui.ui1;
  return ui;
};

export const ui2CaseReducer: CaseReducerType<UiStateType, Ui2ActionType> = (ui, action) => {
  ui.ui2 = !ui.ui2;
  return ui;
};

export const ui3CaseReducer: CaseReducerType<UiStateType, Ui3ActionType> = (ui, action) => {
  ui.ui3 = !ui.ui3;
  return ui;
};
