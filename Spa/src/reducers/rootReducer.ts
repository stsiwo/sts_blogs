import { combineReducers, createStore } from 'redux'
import { uiReducer } from './sliceReducers/uiReducer';
import { appReducer } from './sliceReducers/appReducer';
import { domainReducer } from './sliceReducers/domain/domainReducer';

export const rootReducer = combineReducers({
  ui: uiReducer,
  app: appReducer,
  domain: domainReducer,
})
