export interface IUser {
  id: number
  username: string
  email: string
  password?: string
  role: 'user' | 'admin'
  active: boolean
  created_at: string
}

export interface ICreateUser {
  success: boolean
  error?: any
  user?: IUser
}

export interface IEditUser extends ICreateUser {}

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
    password: string,
    role?: 'user' | 'admin'
  ) => Promise<ICreateUser>
  verifyAndCreateUser: (
    username: string,
    email: string,
    password: string,
    role?: 'user' | 'admin'
  ) => Promise<ICreateUser>
  findUserWithPassword: (
    findBy: 'id' | 'username',
    value: number | string
  ) => Promise<IFindUser>
  findUser: (
    findBy: 'id' | 'username',
    value: number | string
  ) => Promise<IFindUser>
  cleanseUserEditRequest: (userRequest: Partial<IUser>) => Partial<IUser>
  editUser: (id: number, user: Partial<IUser>) => Promise<IEditUser>
}
