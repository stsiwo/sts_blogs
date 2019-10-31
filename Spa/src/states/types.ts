import { TagType } from "../domain/tag/TagType";
import { UserType } from "../domain/user/UserType";

export declare type UiStateType = {
  isLoginFormOpen: boolean;
  isSignupFormOpen: boolean;
  isNavBarOpen: boolean;
  isFilterSortBarOpen: boolean;
}

export declare type AppStateType = {
  isLogin: boolean;
}

export declare type DomainStateType = {
  user: UserType
  tags: TagType[]
}

export declare type StateType = {
  ui: UiStateType,
  app: AppStateType,
  domain: DomainStateType,
}
