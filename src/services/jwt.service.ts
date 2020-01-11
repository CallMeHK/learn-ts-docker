import * as jwt from "jsonwebtoken"
import { config } from "../config"
import { IJwtService, ISignToken, IJwtPayload } from "./jwt.interface"

const jwtSecret = config.auth.jwtSecret

const JwtServiceFactory = (secret: string): IJwtService => {
  const JwtService = {
    signToken: (userId: number, role: 'user' | 'admin'): ISignToken => {
      try {
        const token = jwt.sign({ userId, role }, secret)
        return { success: true, token }
      } catch (e) {
        console.log("Could not sign jwt")
        return { success: false }
      }
    },

    verifyToken: (token: string) => {
     try {
       const payload = jwt.verify(token, secret) as IJwtPayload
       return {
         valid: true,
         payload
       }
     } catch (e) {
       console.log('Cannot verify jwt')
       return {
         valid: false
       }
     } 
    },

  }

  return JwtService
}

const JwtService = JwtServiceFactory(jwtSecret)

export { JwtService, JwtServiceFactory }
