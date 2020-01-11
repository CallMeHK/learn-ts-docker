import * as express from 'express'
import {
  loginUserMiddleware,
  logOutUserMiddleware,
  decodeTokenMiddleware
} from '../middleware/auth.middleware'

const authRoutes = express()

authRoutes.get('/', (req, res) => res.send('authRoutes'))

authRoutes.post('/login', loginUserMiddleware)
authRoutes.post('/logout', logOutUserMiddleware)

authRoutes.post('/test-token', decodeTokenMiddleware, (req: any, res: any) =>
  res.send(req.state)
)

export { authRoutes }
