import { combineReducers, createStore } from 'redux'
import { uiReducer } from './sliceReducers/uiReducer';
import { appReducer } from './sliceReducers/appReducer';

export const rootReducer = combineReducers({
  ui: uiReducer,
  app: appReducer
})
