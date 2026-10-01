import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import Event from '../components/Event'
import '../css/LocationEvents.css'

export default function LocationEvents({ slug }) {
    const [data, setData] = useState(null)
    const [error, setError] = useState('')
    useEffect(() => {
        const controller = new AbortController()
        setData(null)
        setError('')
        Promise.all([
            LocationsAPI.getLocation(slug, controller.signal),
            LocationsAPI.getLocationEvents(slug, controller.signal)
        ]).then(([location, events]) => setData({ location, events }))
            .catch(error => { if (error.name !== 'AbortError') setError(error.message) })
        return () => controller.abort()
    }, [slug])
    if (error) return <p role="alert">{error} <Link to="/">Back to plaza</Link></p>
    if (!data) return <p role="status">Loading venue events…</p>
    const { location, events } = data
    return <section className="location-events">
        <Link to="/">← Back to plaza</Link>
        <header className="location-header">
            <img src={location.image} alt="UnityGrid community plaza" />
            <div><h2>{location.name}</h2>
                <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
            </div>
        </header>
        <h3>Events at this venue</h3>
        <div className="event-grid">
            {events.length ? events.map(event => <Event key={event.id} event={event} />) : <p>No events scheduled at this location yet.</p>}
        </div>
    </section>
}
