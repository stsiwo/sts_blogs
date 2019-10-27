import { createStore } from "redux";
import { rootReducer } from "../../src/reducers/rootReducer";
import { initialState } from "../../src/states/state";
import { Ui1ActionType } from "../../src/actions/types";
import { prettyConsole } from "../../src/utils";


describe('rr01_rootReducer', () => {

  it('should have same state as initial state', () => {

    let store = createStore(rootReducer)
    
    expect(store.getState()).toEqual(initialState)
  })

  it('should update ui.ui1 state when that action is dispatched', () => {

    let store = createStore(rootReducer)

    let action: Ui1ActionType = {
      type: 'UI_1',
      ui1: false
    }

    store.dispatch(action)

    expect(store.getState().ui.ui1).toEqual(false)
  })
})
