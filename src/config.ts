import { Pool } from "pg"

const connectionString = process.env.POSTGRES_DATABASE_URL
const pointsPerBeer = parseInt(process.env.DEFAULT_POINT_PER_BEER)
const saltRounds = parseInt(process.env.SALT_ROUNDS)

const pool = new Pool({ connectionString })

const config = {
  postgres: {
    pool,
    connectionString
  },
  userDefaults: {
    pointsPerBeer,
    saltRounds
  }
}

export { config }
