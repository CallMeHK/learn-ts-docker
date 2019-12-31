import * as express from "express"
import { UserService } from "../services/user.service"
import { IUser } from "../services/user.interface"

export const findUserMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = parseInt(req.params.id)
  let userServiceResponse = await UserService.findUser(id)

  if (userServiceResponse.success === true) {
    const user: IUser = {
      ...userServiceResponse.user,
      password: undefined
    }

    res.send({ success: true, user })
  } else {
    res.send({ success: false })
  }
}

