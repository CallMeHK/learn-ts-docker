import * as jwt from "jsonwebtoken"
import { config } from "../config"
import { IJwtService, ISignToken } from "./jwt.interface"

const jwtSecret = config.auth.jwtSecret

const JwtServiceFactory = (secret: string): IJwtService => {
  const JwtService = {
    signToken: (userId: number): ISignToken => {
      try {
        const token = jwt.sign({ userId }, secret)
        return { success: true, token }
      } catch (e) {
        console.log("Could not sign jwt")
        return { success: false }
      }
    },

    verifyToken: () => {},

    decodeToken: () => {}
  }

  return JwtService
}

const JwtService = JwtServiceFactory(jwtSecret)

export { JwtService, JwtServiceFactory }
