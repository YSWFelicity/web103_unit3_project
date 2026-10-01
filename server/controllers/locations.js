import { pool } from '../config/database.js'

export const getAllLocations = async (_req, res, next) => {
    try {
        const { rows } = await pool.query('SELECT * FROM locations ORDER BY id')
        res.json(rows)
    } catch (error) { next(error) }
}

export const getLocation = async (req, res, next) => {
    try {
        const { rows } = await pool.query('SELECT * FROM locations WHERE slug = $1', [req.params.slug])
        if (!rows.length) return res.status(404).json({ error: 'Location not found' })
        res.json(rows[0])
    } catch (error) { next(error) }
}

export const getLocationEvents = async (req, res, next) => {
    try {
        const location = await pool.query('SELECT id FROM locations WHERE slug = $1', [req.params.slug])
        if (!location.rows.length) return res.status(404).json({ error: 'Location not found' })
        const { rows } = await pool.query(`
            SELECT e.*, l.name AS location_name, l.slug AS location_slug, l.timezone
            FROM events e JOIN locations l ON l.id = e.location_id
            WHERE e.location_id = $1 ORDER BY e.starts_at, e.id
        `, [location.rows[0].id])
        res.json(rows)
    } catch (error) { next(error) }
}
