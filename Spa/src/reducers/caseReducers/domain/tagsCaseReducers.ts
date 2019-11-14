import { CaseReducerType } from "../CaseReducerType";
import { DomainStateType } from "states/types";
import { AssignTagsActionType } from "actions/types";
import { TagType } from "domain/tag/TagType";

export const assignTagsCaseReducer: CaseReducerType<TagType[], AssignTagsActionType> = (tags, action) => {
  return action.tags;
};

