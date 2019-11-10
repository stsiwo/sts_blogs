import { UserType, UserLoginType, UserSignupType } from "./UserType";

export declare type UserValidationType = {
  name: string
  email: string
  password: string
  confirm: string
}

export const initialUserValidationState: UserValidationType = {
  name: '',
  email: '',
  password: '',
  confirm: '',
}

export declare type UserInputTouchedType = {
  [P in keyof UserValidationType]: boolean
}

export const initialUserInputTouchedState: UserInputTouchedType = {
  name: false,
  email: false,
  password: false,
  confirm: false,
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

export declare type UserSignupValidationType = {
  [P in keyof UserSignupType]: string
}

export const initialUserSignupValidationState: UserSignupValidationType = {
  name: '',
  email: '',
  password: '',
  confirm: '',
}

export declare type UserSignupInputTouchedType = {
  [P in keyof UserSignupType]: boolean
}

export const initialUserSignupInputTouchedState: UserSignupInputTouchedType = {
  name: false,
  email: false,
  password: false,
  confirm: false,
}
