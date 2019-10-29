import { StateType } from "./types";

export const initialState: StateType = {
  ui: {
    isLoginFormOpen: false,
    isSignupFormOpen: false,
    isNavBarOpen: false,
    isFilterSortBarOpen: false,
  },
  app: {
    isLogin: false
  }
}
