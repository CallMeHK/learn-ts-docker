export interface IJwtPayload {
  userId: number,
  role: 'user' | 'admin'
  iat: number
}

export interface ISignToken {
  success: boolean
  token?: string
}

export interface IVerifyToken {
  valid: boolean
  payload?: IJwtPayload
}

export interface IJwtService {
  signToken: (userId: number, role: 'user' | 'admin') => ISignToken
  verifyToken: (token: string) => IVerifyToken
}
