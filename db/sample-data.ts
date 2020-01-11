require("dotenv").config()

import { UserService } from "../src/services/user.service"
import { config } from "../src/config"
import { AuthenticationService } from "../src/services/authentication.service"

const { pool } = config.postgres

const populateUsers = async () => {
  const sampleUsers: {name: string, email: string, password: string, role: 'user' | 'admin'}[] = [
    {
      name: "Ty",
      email: "ty@ex.com",
      password: "1",
      role: 'admin'
    },
    {
      name: "J",
      email: "J@ex.com",
      password: "2",
      role: 'user'
    },
    {
      name: "Haeli",
      email: "haeli@ex.com",
      password: "3",
      role: 'user'
    }
  ]
  try {
    for (const userInfo of sampleUsers) {
      await UserService.verifyAndCreateUser(
        userInfo.name,
        userInfo.email,
        userInfo.password,
        userInfo.role
      )
    }
  } catch (e) {
    console.log("could not populate sample user data", e)
  }
}

const populateWithSampleData = async () => {
  try {
    await populateUsers()
    console.log(" \n> Populated database with sample data \n ")
    pool.end()
  } catch (e) {
    console.log(e)
  }
}

populateWithSampleData()
