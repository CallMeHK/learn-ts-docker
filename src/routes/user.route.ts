import * as express from "express"
import {
  findUserMiddleware,
  createUserMiddleware,
  editUserMiddleware
} from "../middleware/user.middleware"

const userRoutes = express()

userRoutes.get("/", (req, res) => res.send("userRoutes"))

userRoutes.get("/:id", findUserMiddleware)
userRoutes.post("/create", createUserMiddleware)
userRoutes.post('/edit', editUserMiddleware)

export { userRoutes }
