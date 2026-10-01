import { request } from './request'
export default {
    getAllLocations: signal => request('/locations', signal),
    getLocation: (slug, signal) => request(`/locations/${encodeURIComponent(slug)}`, signal),
    getLocationEvents: (slug, signal) => request(`/locations/${encodeURIComponent(slug)}/events`, signal)
}
