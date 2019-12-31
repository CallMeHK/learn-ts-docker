import * as express from 'express'
import { findUserMiddleware } from '../middleware/user.middleware'

const userRoutes = express()


userRoutes.get('/', (req, res) => res.send('userRoutes'))
userRoutes.get('/:id', findUserMiddleware)

export {
  userRoutes
}