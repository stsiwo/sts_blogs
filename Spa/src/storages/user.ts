import { UserType } from "domain/user/UserType";

export const storeUserInfo = (user: UserType): void => {
  localStorage.setItem('auth-user', JSON.stringify(user))
}

export const removeUserInfo = () => {
  localStorage.removeItem('auth-user') 
}

export const getUserInfo = (): UserType => {
  return JSON.parse(localStorage.getItem('auth-user')) as UserType
}

export const isUserLoggedIn = (): boolean => {
  return localStorage.getItem('auth-user') === null || localStorage.getItem('auth-user') === 'undefined' ? false : true
}
