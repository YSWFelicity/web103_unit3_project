import { request } from './request'
export default {
    getAllEvents: signal => request('/events', signal),
    getEventById: (id, signal) => request(`/events/${encodeURIComponent(id)}`, signal)
}
