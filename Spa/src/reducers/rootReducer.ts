import { combineReducers, createStore } from 'redux'
import { uiReducer } from './sliceReducers/uiReducer';

export const rootReducer = combineReducers({
  ui: uiReducer
})
