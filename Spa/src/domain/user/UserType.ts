/** for user who login this web app **/
export declare type UserType = {
  id: string, 
  name: string,
  email?: string,
  password?: string,
  confirm?: string,
  avatarUrl?: string,
  avatarImage?: Blob,
  role?: RoleEnum
}

export enum RoleEnum {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export const initialUserState: UserType = {
  id: '', 
  name: '',
  email: '',
  password: '',
  avatarUrl: '',
  avatarImage: null,
  role: null, 
}

export declare type UserLoginRequestDataType = {
  email: string
  password: string
}


export declare type UserLoginType = {
  confirm: string
} & UserLoginRequestDataType

export const initialUserLoginStatus: UserLoginType = {
  email: '',
  password: '',
  confirm: '',
}

export declare type UserSignupRequestDataType = {
  name: string
  email: string
  password: string
}

export declare type UserSignupType = {
  confirm: string
} & UserSignupRequestDataType


export const initialUserSignupStatus: UserSignupType = {
  name: '',
  email: '',
  password: '',
  confirm: '',
}

