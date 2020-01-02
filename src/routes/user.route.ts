import * as express from "express"
import {
  findUserMiddleware,
  createUserMiddleware
} from "../middleware/user.middleware"

const userRoutes = express()

userRoutes.get("/", (req, res) => res.send("userRoutes"))

userRoutes.get("/:id", findUserMiddleware)
userRoutes.post("/create", createUserMiddleware)

export { userRoutes }
