import { TagType } from "../domain/tag/TagType";
import { UserType } from "../domain/user/UserType";
import { BlogType } from "../domain/blog/BlogType";

export declare type UiStateType = {
  isLoginFormOpen: boolean;
  isSignupFormOpen: boolean;
  isNavBarOpen: boolean;
  isFilterSortBarOpen: boolean;
}

export declare type AppStateType = {
  isLogin: boolean
  isBlogsFetching: boolean
  isTagsFetching: boolean
}

export declare type DomainStateType = {
  blogs: BlogType[]
  user: UserType
  tags: TagType[]
}

export declare type StateType = {
  ui: UiStateType
  app: AppStateType
  domain: DomainStateType
}
