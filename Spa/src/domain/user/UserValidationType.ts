import { UserType, UserLoginType } from "./UserType";

export declare type UserValidationType = {
  [P in keyof UserType]: string
}

export const initialUserValidationState: UserValidationType = {
  id: '',
  name: '',
  email: '',
  password: '',
  confirm: '',
  avatarUrl: '',
  avatarImage: '',
}

export declare type UserInputTouchedType = {
  [P in keyof UserType]: boolean
}

export const initialUserInputTouchedState: UserInputTouchedType = {
  id: false,
  name: false,
  email: false,
  password: false,
  confirm: false,
  avatarUrl: false,
  avatarImage: false,
}

export declare type UserLoginValidationType = {
  [P in keyof UserLoginType]: string
}

export const initialUserLoginValidationState: UserLoginValidationType = {
  email: '',
  password: '',
  confirm: '',
}

export declare type UserLoginInputTouchedType = {
  [P in keyof UserLoginType]: boolean
}

export const initialUserLoginInputTouchedState: UserLoginInputTouchedType = {
  email: false,
  password: false,
  confirm: false,
}
