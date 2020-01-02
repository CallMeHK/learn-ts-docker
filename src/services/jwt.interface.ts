export interface ISignToken {
  success: boolean
  token?: string
}

export interface IJwtService {
  signToken: (userId: number) => ISignToken
  verifyToken: () => void
  decodeToken: () => void
}
