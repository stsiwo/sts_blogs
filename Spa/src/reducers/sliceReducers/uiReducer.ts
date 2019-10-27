import { createReducer } from "./createReducer";
import { StateType, UiStateType } from '../../states/types';
import { initialState } from "../../states/state";
import { uiHandler } from "../handlers/uiHandler";

export const uiReducer = createReducer<UiStateType>(initialState.ui, uiHandler);
