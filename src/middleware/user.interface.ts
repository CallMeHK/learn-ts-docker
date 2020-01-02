import * as express from "express"

export interface IFindUserRequest extends express.Request {
  params:{
    id: string
  }
}

export interface ICreateUserRequest extends express.Request {
  body:{
    username: string
    email: string
    password: string
  }
}