require('dotenv').config()

import * as express from 'express'
import * as passport from 'passport'
import { Strategy } from 'passport-local'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import { userRoutes } from './src/routes/user.route'
import { authRoutes } from './src/routes/auth.route'


const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cookieParser());


app.get('/', (req, res) => res.send('Hello World!!!'))
app.post('/', (req, res) => res.send(`${req.body.hello}`))

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(port, () =>
  console.log(`
  >>> Server listening on port ${port}!`)
)
