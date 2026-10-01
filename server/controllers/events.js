import { pool } from '../config/database.js'

const eventQuery = `
    SELECT e.*, l.name AS location_name, l.slug AS location_slug, l.timezone
    FROM events e JOIN locations l ON l.id = e.location_id
`

export const getAllEvents = async (_req, res, next) => {
    try {
        const { rows } = await pool.query(`${eventQuery} ORDER BY e.starts_at, e.id`)
        res.json(rows)
    } catch (error) { next(error) }
}

export const getEventById = async (req, res, next) => {
    const id = Number(req.params.id)
    if (!/^\d+$/.test(req.params.id) || !Number.isSafeInteger(id) || id < 1 || id > 2147483647) {
        return res.status(400).json({ error: 'Event ID must be a positive integer' })
    }
    try {
        const { rows } = await pool.query(`${eventQuery} WHERE e.id = $1`, [id])
        if (!rows.length) return res.status(404).json({ error: 'Event not found' })
        res.json(rows[0])
    } catch (error) { next(error) }
}
