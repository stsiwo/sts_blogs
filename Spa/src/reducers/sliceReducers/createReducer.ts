import { HandlerType } from "../handlers/types";
import { Action } from "redux";
import { AppActionType } from "../../actions/types";


export function createReducer<T>(initialState: T, handlers: HandlerType<T>) {
  return (state: T = initialState, action: AppActionType) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state;
    }
  }
}
