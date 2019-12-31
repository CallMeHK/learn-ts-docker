require("dotenv").config()

import { UserService } from "../src/services/user.service"
import { config } from "../src/config"
import { AuthenticationService } from "../src/services/authentication.service"

const { pool } = config.postgres

const populateUsers = async () => {
  const sampleUsers = [
    {
      name: "Ty",
      email: "ty@ex.com",
      password: "1"
    },
    {
      name: "J",
      email: "J@ex.com",
      password: "2"
    },
    {
      name: "Haeli",
      email: "haeli@ex.com",
      password: "3"
    }
  ]
  try {
    for (const userInfo of sampleUsers) {
      const hashedPassword = await AuthenticationService.hashPassword(userInfo.password)
      await UserService.createUser(
        userInfo.name,
        userInfo.email,
        hashedPassword
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
