import { CaseReducerType } from "../CaseReducerType";
import { DomainStateType } from "../../../states/types";
import { AssignBlogsActionType } from "../../../actions/types";
import { BlogType } from "../../../domain/blog/BlogType";

export const assignBlogsCaseReducer: CaseReducerType<BlogType[], AssignBlogsActionType> = (blogs, action) => {
  return action.blogs;
};


