import { pool } from './database.js'

// Fictional community events at the starter project's four venues.
const locations = [
    ['echolounge', 'Echo Lounge', '1323 N Stemmons Fwy', 'Dallas', 'TX', '75207'],
    ['houseofblues', 'House of Blues', '2200 N Lamar St', 'Dallas', 'TX', '75202'],
    ['pavilion', 'The Pavilion', '1818 1st Ave', 'Dallas', 'TX', '75210'],
    ['americanairlines', 'American Airlines Center', '2500 Victory Ave', 'Dallas', 'TX', '75219']
]

const events = [
    ['echo-indie-night', 'echolounge', 'Indie Discovery Night', 'Meet local indie bands and discover your next favorite song.', '2026-10-09T19:00:00-05:00'],
    ['echo-acoustic', 'echolounge', 'Acoustic Sunday', 'A relaxed evening of acoustic music and community connections.', '2026-10-18T18:00:00-05:00'],
    ['blues-jam', 'houseofblues', 'Community Blues Jam', 'Local musicians take the stage for a lively blues jam.', '2026-10-10T20:00:00-05:00'],
    ['blues-soul', 'houseofblues', 'Soul and Rhythm Night', 'Celebrate soulful vocals and classic rhythm and blues.', '2026-10-23T19:30:00-05:00'],
    ['pavilion-festival', 'pavilion', 'Plaza Music Festival', 'An outdoor afternoon featuring music from community artists.', '2026-10-17T15:00:00-05:00'],
    ['pavilion-summer', 'pavilion', 'Summer Send-Off', 'Our community gathered to celebrate the end of summer.', '2026-09-12T17:00:00-05:00'],
    ['arena-pop', 'americanairlines', 'Pop Celebration', 'A big-stage evening of upbeat pop music.', '2026-10-24T19:00:00-05:00'],
    ['arena-community', 'americanairlines', 'Community Concert', 'A past concert celebrating the sounds of our city.', '2026-09-19T19:00:00-05:00']
]

let client
try {
    const missing = ['PGUSER', 'PGPASSWORD', 'PGHOST', 'PGDATABASE'].filter(key => !process.env[key])
    if (missing.length) throw new Error(`Missing server/.env values: ${missing.join(', ')}`)

    client = await pool.connect()
    await client.query('BEGIN')
    // Despite the assignment's filename, this script does not drop tables.
    await client.query(`
        CREATE TABLE IF NOT EXISTS locations (
            id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            slug TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip TEXT NOT NULL,
            image TEXT NOT NULL,
            timezone TEXT NOT NULL DEFAULT 'America/Chicago'
        );
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            slug TEXT NOT NULL UNIQUE,
            location_id INTEGER NOT NULL REFERENCES locations(id),
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            starts_at TIMESTAMPTZ NOT NULL,
            image TEXT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS events_location_starts_at_idx
            ON events (location_id, starts_at);
    `)

    for (const location of locations) {
        await client.query(`
            INSERT INTO locations (slug, name, address, city, state, zip, image)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (slug) DO NOTHING
        `, [...location, '/images/unitygrid.jpg'])
    }
    for (const [slug, locationSlug, title, description, startsAt] of events) {
        await client.query(`
            INSERT INTO events (slug, location_id, title, description, starts_at, image)
            VALUES ($1, (SELECT id FROM locations WHERE slug = $2), $3, $4, $5, $6)
            ON CONFLICT (slug) DO NOTHING
        `, [slug, locationSlug, title, description, startsAt, '/images/unitygrid.jpg'])
    }

    await client.query('COMMIT')
    const { rows } = await client.query(`
        SELECT l.name, COUNT(e.id)::integer AS event_count
        FROM locations l LEFT JOIN events e ON e.location_id = l.id
        GROUP BY l.id ORDER BY l.id
    `)
    console.table(rows)
    console.log('Database setup complete. Existing records were preserved.')
} catch (error) {
    if (client) await client.query('ROLLBACK')
    console.error(`Database setup failed: ${error.message}`)
    process.exitCode = 1
} finally {
    if (client) client.release()
    await pool.end()
}
