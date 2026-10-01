import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCountdown } from '../utils/countdown'
import '../css/Event.css'

export default function Event({ event }) {
    const [now, setNow] = useState(() => Date.now())
    useEffect(() => {
        setNow(Date.now())
        const timer = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(timer)
    }, [event.starts_at])
    const countdown = getCountdown(event.starts_at, now)
    const startsAt = new Date(event.starts_at)
    const formatted = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium', timeStyle: 'short', timeZone: event.timezone
    }).format(startsAt)
    return <article className={`event-information${countdown.past ? ' event-past' : ''}`}>
        <img src={event.image} alt="" loading="lazy" />
        <div className="event-copy">
            <h3>{event.title}</h3>
            <p className={`event-countdown${countdown.past ? ' countdown-past' : ''}`}>{countdown.text}</p>
            <p><time dateTime={event.starts_at}>{formatted}</time> (Dallas time)</p>
            <p>{event.description}</p>
            <Link to={`/${event.location_slug}`}>{event.location_name}</Link>
        </div>
    </article>
}
