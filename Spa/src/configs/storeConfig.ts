import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from '../reducers/rootReducer';
import { initialState } from '../states/state';

const middleware: any[] = []


const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middleware)
));
