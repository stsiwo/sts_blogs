import { createContext, useContext, useReducer, Reducer, ReducerState, Dispatch, ReducerAction } from "react";
import { AuthContextType, AuthContextActionType, AuthType } from "./types";
import { storeUserInfo, removeUserInfo } from "../../../../storages/user";
import { Action } from "redux";


// for provider
export const AuthContext = createContext<AuthContextType>(null);

// for consumer 
export const useAuthContext = (): AuthContextType => {
  return useContext<AuthContextType>(AuthContext);
}

// for update this context
const updateAuthContextReducer: Reducer<AuthType, AuthContextActionType> = (state, action) => {
  switch (action.type) {
    case 'login':
      storeUserInfo(action.user)
      return {
        authed: true,
        user: action.user
      }
    case 'logout':
      removeUserInfo()
      return {
        authed: false
      }
    default:
      return state
  }
}
export const useUpdateAuthContextReducer = (): [ReducerState<Reducer<AuthType, AuthContextActionType>>, Dispatch<ReducerAction<Reducer<AuthType, AuthContextActionType>>>] => {
  return useReducer(updateAuthContextReducer, { authed: false })
}

