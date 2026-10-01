import { pool } from './database.js'

const required = ['PGUSER', 'PGPASSWORD', 'PGHOST', 'PGDATABASE']
const missing = required.filter(key => !process.env[key])

try {
    if (missing.length) {
        throw new Error(`Missing server/.env values: ${missing.join(', ')}`)
    }

    const { rows } = await pool.query('SELECT current_database() AS database, NOW() AS server_time')
    console.log(`Connected to PostgreSQL database: ${rows[0].database}`)
    console.log(`Database server time: ${rows[0].server_time.toISOString()}`)
} catch (error) {
    console.error(`Database connection failed: ${error.message}`)
    process.exitCode = 1
} finally {
    await pool.end()
}
