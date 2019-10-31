import { createReducer } from "../createReducer";
import { DomainStateType } from "../../../states/types";
import { initialState } from "../../../states/state";
import { BlogType } from "../../../domain/blog/BlogType";
import { blogsHandler } from "../../handlers/domain/blogsHandler";

export const blogsReducer = createReducer<BlogType[]>(initialState.domain.blogs, blogsHandler);

