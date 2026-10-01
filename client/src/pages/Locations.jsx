import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import unitygrid from '../assets/unitygrid.jpg'
import '../css/Locations.css'

const regions = [{'slug': 'echolounge', 'points': '2.97,234.52 17.94,198.9 34.45,188.58 52.52,191.68 56.65,196.32 69.03,162.26 84,137.48 \n                103.61,121.48 126.32,109.61 154.71,125.61 175.87,149.87 189.81,176.71 199.61,206.13 205.81,229.35 210.45,243.81 206.84,272.19 \n                214.58,285.1 214.58,302.13 203.74,334.13 194.45,351.68 205.29,366.65 132.52,366.65 159.35,391.42 155.74,399.68 119.61,399.68 \n                86.06,399.68 62.84,399.68 25.16,399.68 0,397.61 '}, {'slug': 'houseofblues', 'points': '358.58,353.74 376.65,322.77 389.55,314.52 384.39,280.45 407.61,272.19 422.06,220.58 \n                438.58,126.65 449.42,38.39 457.68,16.71 468,35.81 474.19,103.42 491.74,203.03 508.26,261.87 517.03,281.48 517.03,214.9 \n                529.42,194.26 540.77,197.35 540.77,169.48 552.13,167.94 556.77,149.87 566.06,156.06 566.06,193.74 577.42,211.81 577.42,238.65 \n                601.16,254.65 594.45,302.13 575.87,335.68 587.23,353.74 601.16,363.55 358.58,363.55 '}, {'slug': 'pavilion', 'points': '998.06,83.81 952.65,31.16 914.45,16.71 877.29,43.55 833.94,102.39 811.74,161.23 \n                796.77,241.23 802.97,303.16 833.94,353.23 871.61,385.23 954.71,385.23 1000.32,387.81 '}, {'slug': 'americanairlines', 'points': '625,291 615,305 608,318 625,338 637,354 622.5,358 673,363.5 751,363.5 793,363.5 \n                769,352 772,347 793,340 806,321 796.8,291 784,269 757,261 730,272 707,281 672,283 '}]

export default function Locations() {
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    useEffect(() => {
        const controller = new AbortController()
        LocationsAPI.getAllLocations(controller.signal)
            .then(setLocations)
            .catch(error => { if (error.name !== 'AbortError') setError(error.message) })
            .finally(() => { if (!controller.signal.aborted) setLoading(false) })
        return () => controller.abort()
    }, [])
    if (loading) return <p role="status">Loading locations…</p>
    if (error) return <p role="alert">{error}</p>
    return <section className="locations-page">
        <h2>Explore the plaza</h2>
        <p>Choose a highlighted landmark to discover its music events.</p>
        <div className="available-locations">
            <svg viewBox="0 0 1000.32 500" aria-label="Interactive map of four music venues">
                <image href={unitygrid} width="1000.32" height="500" />
                {regions.map(region => {
                    const location = locations.find(item => item.slug === region.slug)
                    return location && <Link key={region.slug} to={`/${region.slug}`} aria-label={`View events at ${location.name}`}>
                        <title>{location.name}</title>
                        <polygon points={region.points} />
                    </Link>
                })}
            </svg>
        </div>
        <nav className="venue-links" aria-label="Music venues">
            {locations.map(location => <Link key={location.id} to={`/${location.slug}`}>{location.name}</Link>)}
        </nav>
    </section>
}
