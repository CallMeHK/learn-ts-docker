import * as express from "express"
import { IUser } from "../services/user.interface";

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

export interface IEditUserRequest extends express.Request {
  body: Partial<IUser>
}