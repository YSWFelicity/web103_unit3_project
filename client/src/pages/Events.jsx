import React, { useEffect, useState } from 'react'
import EventsAPI from '../services/EventsAPI'
import Event from '../components/Event'

export default function Events() {
    const [events, setEvents] = useState(null)
    const [error, setError] = useState('')
    useEffect(() => {
        const controller = new AbortController()
        EventsAPI.getAllEvents(controller.signal).then(setEvents)
            .catch(error => { if (error.name !== 'AbortError') setError(error.message) })
        return () => controller.abort()
    }, [])
    if (error) return <p role="alert">{error}</p>
    if (!events) return <p role="status">Loading events…</p>
    return <section className="events-page"><h2>All events</h2>
        <p>Discover music across the plaza. These are fictional community events.</p>
        <div className="event-grid">{events.length ? events.map(event => <Event key={event.id} event={event} />) : <p>No events scheduled yet.</p>}</div>
    </section>
}
