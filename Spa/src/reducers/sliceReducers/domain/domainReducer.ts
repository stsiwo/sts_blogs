import { tagsReducer } from "./tagsReducer";
import { combineReducers } from 'redux'
import { userReducer } from "./userReducer";
import { blogsReducer } from "./blogsReducer";

export const domainReducer = combineReducers({
  user: userReducer,
  tags: tagsReducer,
  blogs: blogsReducer,
})
