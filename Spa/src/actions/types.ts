import { Action } from "redux";

export declare type ActionTypeType = {
  UI_1: string;
  UI_2: string;
  UI_3: string;
}

// base action type which only allow type is one of ActionTypeType
export declare type AppActionType = Action<keyof ActionTypeType>

export declare type Ui1ActionType = AppActionType & {
  ui1: boolean
}

export declare type Ui2ActionType = AppActionType & {
  ui2: boolean
}

export declare type Ui3ActionType = AppActionType & {
  ui3: boolean
}

