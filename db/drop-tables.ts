require("dotenv").config()
import { Pool } from "pg"

const connectionString = process.env.POSTGRES_DATABASE_URL

const pool = new Pool({ connectionString })

const dropTable = async (tableName: string) => {
  console.log(`Dropping table ${tableName}`)
  await pool.query(`DROP TABLE IF EXISTS ${tableName} CASCADE`)
}

const dropAllTables = async () => {
  await dropTable('activities')
  await dropTable('user_activities')
  await dropTable('user_cache')
  await dropTable('users')
  console.log('\n> Dropped all tables \n')
  pool.end()
}

dropAllTables()