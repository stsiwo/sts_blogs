import { CaseReducerType } from "../CaseReducerType";
import { DomainStateType } from "states/types";
import { AssignUserActionType } from "actions/types";
import { UserType } from "domain/user/UserType";

export const assignUserCaseReducer: CaseReducerType<UserType, AssignUserActionType> = (user, action) => {
  return action.user;
};


