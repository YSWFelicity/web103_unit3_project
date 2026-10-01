import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Event.css'

export default function Event({ event }) {
    const startsAt = new Date(event.starts_at)
    const formatted = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium', timeStyle: 'short', timeZone: event.timezone
    }).format(startsAt)
    return <article className="event-information">
        <img src={event.image} alt="" loading="lazy" />
        <div className="event-copy">
            <h3>{event.title}</h3>
            <p><time dateTime={event.starts_at}>{formatted}</time> (Dallas time)</p>
            <p>{event.description}</p>
            <Link to={`/${event.location_slug}`}>{event.location_name}</Link>
        </div>
    </article>
}
