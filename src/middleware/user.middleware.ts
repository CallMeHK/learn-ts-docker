import * as express from 'express'
import { UserService } from '../services/user.service'
import {
  IFindUserRequest,
  ICreateUserRequest,
  IEditUserRequest
} from './user.interface'

export const findUserMiddleware = async (
  req: IFindUserRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = parseInt(req.params.id)
  let userServiceResponse = await UserService.findUser('id', id)

  res.send(userServiceResponse)
}

export const createUserMiddleware = async (
  req: ICreateUserRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const { username, email, password } = req.body

  const createUserAttempt = await UserService.verifyAndCreateUser(
    username,
    email,
    password
  )

  res.send(createUserAttempt)
}

export const editUserMiddleware = async (
  req: IEditUserRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id } = req.body

  const cleanedUserRequest = UserService.cleanseUserEditRequest(req.body)

  const editUserResponse = await UserService.editUser(id, cleanedUserRequest)

  res.send(editUserResponse)
}
