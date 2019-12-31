
require("dotenv").config()

import * as express from "express"
import * as passport from "passport"
import { Strategy } from "passport-local"
import * as bodyParser from "body-parser"
import { userRoutes } from "./src/routes/user.route"

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get("/", (req, res) => res.send("Hello World!!!"))
app.post("/", (req, res) => res.send(`${req.body.hello}`))

app.use("/user", userRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
