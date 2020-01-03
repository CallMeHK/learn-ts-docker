export interface IJwtPayload {
  id: number
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
  signToken: (userId: number) => ISignToken
  verifyToken: (token: string) => IVerifyToken
}
