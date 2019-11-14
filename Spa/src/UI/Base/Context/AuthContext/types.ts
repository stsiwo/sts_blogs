import { UserType } from "domain/user/UserType";
import { Action } from "redux";

export declare type AuthContextType = {
  dispatch: React.Dispatch<AuthContextActionType>,
  auth: AuthType 
}

export declare type AuthType = {
  authed: boolean
  user?: UserType
}

export declare type AuthContextActionType = Action<string> & {
  user?: UserType
}
