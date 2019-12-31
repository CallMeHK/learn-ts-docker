export interface IUser {
  id: number
  username: string
  email: string
  password?: string
  point_per_beer: number
  created_at: string
}

export interface ICreateUser {
  success: boolean
  error?: string
  user?: IUser
}

export interface IFindUser {
  success: boolean
  user?: IUser
}

export interface IUserService {
  verifyUserForCreation: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>
  createUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<ICreateUser>
  verifyAndCreateUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<ICreateUser>
  findUser: (id: number) => Promise<IFindUser>
}
