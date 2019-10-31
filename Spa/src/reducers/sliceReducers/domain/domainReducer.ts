import { tagsReducer } from "./tagsReducer";
import { combineReducers } from 'redux'
import { userReducer } from "./userReducer";

export const domainReducer = combineReducers({
  user: userReducer,
  tags: tagsReducer,
})
