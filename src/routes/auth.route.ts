import * as express from "express"
import { loginUserMiddleware, logOutUserMiddleware } from "../middleware/auth.middleware"

const authRoutes = express()

authRoutes.get("/", (req, res) => res.send("authRoutes"))

authRoutes.post("/login", loginUserMiddleware)
authRoutes.post("/logout", logOutUserMiddleware)


export { authRoutes }

