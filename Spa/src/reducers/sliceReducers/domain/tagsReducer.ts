import { createReducer } from "../createReducer";
import { DomainStateType } from "../../../states/types";
import { initialState } from "../../../states/state";
import { TagType } from "../../../domain/tag/TagType";
import { tagsHandler } from "../../handlers/domain/tagsHandler";

export const tagsReducer = createReducer<TagType[]>(initialState.domain.tags, tagsHandler);
