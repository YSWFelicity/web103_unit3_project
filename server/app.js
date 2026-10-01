import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import favicon from 'serve-favicon'
import locationsRouter from './routes/locations.js'
import eventsRouter from './routes/events.js'

const serverDirectory = path.dirname(fileURLToPath(import.meta.url))
const app = express()
app.use(express.json())
app.use('/api/locations', locationsRouter)
app.use('/api/events', eventsRouter)
app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found' }))

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.join(serverDirectory, '../client/public/party.png')))
} else if (process.env.NODE_ENV === 'production') {
    const publicDirectory = path.join(serverDirectory, 'public')
    app.use(favicon(path.join(publicDirectory, 'party.png')))
    app.use(express.static(publicDirectory))
    app.get('/*', (_req, res) => res.sendFile(path.join(publicDirectory, 'index.html')))
}

app.use((error, _req, res, _next) => {
    console.error('Request failed:', error.message)
    res.status(500).json({ error: 'Unable to complete request' })
})

export default app
