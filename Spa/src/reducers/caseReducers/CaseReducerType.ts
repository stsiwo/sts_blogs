import { Action } from "redux";

export type CaseReducerType<T, A = Action> = (state: T, action: A) => T;
