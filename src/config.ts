import { Pool } from "pg"

const connectionString = process.env.POSTGRES_DATABASE_URL
const pointsPerBeer = parseInt(process.env.DEFAULT_POINT_PER_BEER)
const saltRounds = parseInt(process.env.SALT_ROUNDS)
const jwtSecret = process.env.JWT_SECRET

const pool = new Pool({ connectionString })

const config = {
  postgres: {
    pool,
    connectionString
  },
  userDefaults: {
    pointsPerBeer,
    saltRounds
  },
  auth:{
    jwtSecret
  }
}

export { config }
