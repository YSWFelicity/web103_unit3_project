import React, { useEffect, useState } from 'react'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import Event from '../components/Event'

export default function Events() {
    const [events, setEvents] = useState(null)
    const [error, setError] = useState('')
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('all')
    useEffect(() => {
        const controller = new AbortController()
        Promise.all([
            EventsAPI.getAllEvents(controller.signal),
            LocationsAPI.getAllLocations(controller.signal)
        ]).then(([eventsData, locationsData]) => {
            setEvents(eventsData)
            setLocations(locationsData)
        })
            .catch(error => { if (error.name !== 'AbortError') setError(error.message) })
        return () => controller.abort()
    }, [])
    if (error) return <p role="alert">{error}</p>
    if (!events) return <p role="status">Loading events…</p>
    const visibleEvents = selectedLocation === 'all'
        ? events : events.filter(event => event.location_slug === selectedLocation)
    return <section className="events-page"><h2>All events</h2>
        <p>Discover music across the plaza. These are fictional community events.</p>
        <div className="event-filters">
            <label htmlFor="location-filter">Filter by venue
                <select id="location-filter" value={selectedLocation} onChange={event => setSelectedLocation(event.target.value)}>
                    <option value="all">All venues</option>
                    {locations.map(location => <option key={location.id} value={location.slug}>{location.name}</option>)}
                </select>
            </label>
            <p role="status">{visibleEvents.length} {visibleEvents.length === 1 ? 'event' : 'events'}</p>
        </div>
        <div className="event-grid">{visibleEvents.length ? visibleEvents.map(event => <Event key={event.id} event={event} />) : <p>No events at this venue yet.</p>}</div>
    </section>
}
