import { createReducer } from "../createReducer";
import { DomainStateType } from "states/types";
import { initialState } from "states/state";
import { UserType } from "domain/user/UserType";
import { userHandler } from "../../handlers/domain/userHandler";

export const userReducer = createReducer<UserType>(initialState.domain.user, userHandler);

