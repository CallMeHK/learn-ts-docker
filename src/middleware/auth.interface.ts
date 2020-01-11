import * as express from "express"

export interface ILoginUserRequest extends express.Request {
  body:{
    username: string
    password: string
  }
}

export interface IAuthenticationRequest extends express.Request {
  cookies:{
    Token?: string
  },
  state?:{
    tokenValid?: boolean,
    tokenPayload?: {
      userId: number,
      iat: number
    }
  }
}