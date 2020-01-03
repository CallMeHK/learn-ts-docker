import * as bcrypt from "bcrypt"
import { config } from "../config"
import { IAuthenticationService } from "./authentication.interface"

const defaultSaltRounds = config.userDefaults.saltRounds

const AuthenticationServiceFactory = (
  saltRounds: number
): IAuthenticationService => {
  const AuthenticationService = {
    hashPassword: async (password: string) => {
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      return hashedPassword
    },
    comparePasswords: async (password: string, hashedPassword: string) => {
      try {
        const doPasswordsMatch = await bcrypt.compare(password, hashedPassword)
        return doPasswordsMatch
      } catch (e) {
        console.log(e)
        return false
      }
    }
  }

  return AuthenticationService
}

const AuthenticationService = AuthenticationServiceFactory(defaultSaltRounds)

export { AuthenticationService, AuthenticationServiceFactory }
