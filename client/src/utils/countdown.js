export function getCountdown(startsAt, now = Date.now()) {
    const milliseconds = new Date(startsAt).getTime() - now
    if (milliseconds <= 0) return { past: true, text: 'This event has passed' }
    const total = Math.ceil(milliseconds / 1000)
    const days = Math.floor(total / 86400)
    const hours = Math.floor((total % 86400) / 3600)
    const minutes = Math.floor((total % 3600) / 60)
    const seconds = total % 60
    return { past: false, text: `Starts in ${days}d ${hours}h ${minutes}m ${seconds}s` }
}
