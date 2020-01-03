import * as express from "express"

export interface ILoginUserRequest extends express.Request {
  body:{
    username: string
    password: string
  }
}