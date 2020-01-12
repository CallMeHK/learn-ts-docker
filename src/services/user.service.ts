import { Pool } from 'pg'

import { config } from '../config'

import { IUserService, IUser } from './user.interface'
import { IAuthenticationService } from './authentication.interface'
import { AuthenticationService } from './authentication.service'

const pgPool = config.postgres.pool
const defaultPointsPerBeer = config.userDefaults.pointsPerBeer

const UserServiceFactory = (
  pool: Pool,
  pointsPerBeer: number,
  AuthenticationService: IAuthenticationService
): IUserService => {
  const UserService = {
    verifyUserForCreation: async (
      username: string,
      email: string,
      password: string
    ) => {
      const fieldsComplete = !!username && !!email && !!password
      if (fieldsComplete) {
        const text = `SELECT * FROM users WHERE username = $1 OR email = $2`
        const values = [username, email]
        try {
          const query = await pool.query<IUser>(text, values)
          const userExists = !!query.rows[0]
          const credentialsAvailable = !userExists
          return credentialsAvailable
        } catch (e) {
          console.log('failed to query db', e)
          return false
        }
      }
      return false
    },

    createUser: async (
      username: string,
      email: string,
      password: string,
      role: 'user' | 'admin' = 'user'
    ) => {
      const text = `INSERT INTO users (username, email, password, role) VALUES($1, $2, $3, $4) RETURNING *`
      const values = [username, email, password, role]

      try {
        const query = await pool.query<IUser>(text, values)
        const user = query.rows[0]
        console.log(`User ${user.username} created`)
        return {
          success: true,
          user
        }
      } catch (e) {
        console.log('could not create user', e)
        return {
          success: false,
          error: 'Failed to create user'
        }
      }
    },

    verifyAndCreateUser: async (
      username: string,
      email: string,
      password: string,
      role: 'user' | 'admin' = 'user'
    ) => {
      const userIsValid = await UserService.verifyUserForCreation(
        username,
        email,
        password
      )
      if (!userIsValid) {
        return {
          success: false,
          error: 'Email or username already in use'
        }
      }
      const hashedPassword = await AuthenticationService.hashPassword(password)
      const createdUser = await UserService.createUser(
        username,
        email,
        hashedPassword,
        role
      )

      if (createdUser.success === true) {
        const createdUserWithoutPassword: IUser = {
          ...createdUser.user,
          password: undefined
        }

        return {
          success: true,
          user: createdUserWithoutPassword
        }
      }

      return {
        success: false,
        error: 'Failed to create user'
      }
    },

    findUserWithPassword: async (
      findBy: 'id' | 'username',
      value: number | string
    ) => {
      const text = `SELECT * FROM users WHERE ${findBy} = $1`
      const values = [value]

      try {
        const query = await pool.query<IUser>(text, values)
        const user = query.rows[0]

        if (!user) {
          console.log(`Could not find user ${findBy}: ${value}`)
          return {
            success: false
          }
        }

        console.log(`User ${user.username} found`)
        return {
          success: true,
          user
        }
      } catch (e) {
        console.log(`Could not find user ${findBy}: ${value}`, e)
        return {
          success: false
        }
      }
    },

    findUser: async (findBy: 'id' | 'username', value: number | string) => {
      const foundUser = await UserService.findUserWithPassword(findBy, value)

      if (!foundUser.success) {
        return {
          success: false
        }
      }

      const userWithoutPassword: IUser = {
        ...foundUser.user,
        password: undefined
      }

      return {
        success: true,
        user: userWithoutPassword
      }
    },
    cleanseUserEditRequest: (userRequest: Partial<IUser>): Partial<IUser> => {
      const { username, email, password, role, active } = userRequest
      const cleanUserRequest = {
        username,
        email,
        password,
        role,
        active
      }

      const cleanUserRequestWithoutUndefined = Object.keys(
        cleanUserRequest
      ).reduce(
        (acc: Partial<IUser>, key: keyof Omit<IUser, 'id' | 'created_at'>) =>
          cleanUserRequest[key] !== undefined
            ? {
                ...acc,
                [key]: cleanUserRequest[key]
              }
            : acc,
        {}
      ) as Partial<IUser>

      return cleanUserRequestWithoutUndefined
    },
    // REMOVE PASSWORD FROM THIS RETURN
    editUser: async (id: number, user: Partial<IUser>) => {
      if(user.password){
        const hashedPassword = await AuthenticationService.hashPassword(user.password)
        user = {
          ...user,
          password: hashedPassword
        }
      }


      const keys = Object.keys(user) as Array<keyof Partial<IUser>>
      const queryValues = Object.values(user)

      if (!keys[0]) {
        return {
          success: false,
          error: 'No valid changes to user submitted'
        }
      }



      const inlineQueries = keys.map((k: string, i: number) => `${k} = $${i+1}`)
      const joinedInlineQueries = inlineQueries.join(', ')
      const queryIdValueString = `$${keys.length + 1}`

      const queryText = `UPDATE users SET ${joinedInlineQueries} WHERE id = ${queryIdValueString} RETURNING *`

      try {
        const queryResponse = await pool.query<IUser>(
          queryText,
          queryValues.concat([id])
        )
        const editedUser = queryResponse.rows[0]
        return {
          success: true,
          user: editedUser
        }
      } catch (e) {
        console.log(e)
        return {
          success: false,
          error: { queryText, vals: queryValues.concat([id]) } as any
        }
      }
    }
    // deleteUser: () => {},
  }
  return UserService
}

const UserService = UserServiceFactory(
  pgPool,
  defaultPointsPerBeer,
  AuthenticationService
)

export { UserService, UserServiceFactory }
