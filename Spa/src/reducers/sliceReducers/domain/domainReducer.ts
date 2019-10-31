import { tagsReducer } from "./tagsReducer";
import { combineReducers } from 'redux'

export const domainReducer = combineReducers({
  tags: tagsReducer,
})
