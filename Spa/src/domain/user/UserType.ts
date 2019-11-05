/** for user who login this web app **/
export declare type UserType = {
  id: string, 
  name: string,
  email?: string,
  password?: string,
  confirm?: string,
  avatarUrl?: string,
  avatarImage?: Blob,
}

export const initialUserState: UserType = {
  id: '', 
  name: '',
  email: '',
  password: '',
  avatarUrl: '',
  avatarImage: null,
}
