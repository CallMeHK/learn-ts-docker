import * as express from "express"
import { ILoginUserRequest } from "./auth.interface"
import { UserService } from "../services/user.service"
import { AuthenticationService } from "../services/authentication.service"
import { JwtService } from "../services/jwt.service"

export const loginUserMiddleware = async (
  req: ILoginUserRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const { username, password } = req.body

  const getUser = await UserService.findUserWithPassword("username", username)

  if (!getUser.success) {
    res.send({
      success: false,
      error: "Could not log in user"
    })
    return
  }

  const doPasswordsMatch = await AuthenticationService.comparePasswords(
    password,
    getUser.user.password
  )

  if (!doPasswordsMatch) {
    res.send({
      success: false,
      error: "Invalid credentials"
    })
    return
  }

  const token = JwtService.signToken(getUser.user.id)

  res.cookie("Token", token.token)
  res.send({ success: true })
}

export const logOutUserMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.clearCookie('Token')
  
  res.send({ success: true })
}

export const isUserLoggedIn =async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => { }