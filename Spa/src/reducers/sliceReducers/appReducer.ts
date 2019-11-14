import { createReducer } from "./createReducer";
import { initialState } from "states/state";
import { appHandler } from "../handlers/appHandler";
import { AppStateType } from "states/types";

export const appReducer = createReducer<AppStateType>(initialState.app, appHandler);

