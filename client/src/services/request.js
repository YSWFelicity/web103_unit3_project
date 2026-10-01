export const request = async (path, signal) => {
    const response = await fetch(`/api${path}`, { signal })
    if (!response.ok) throw new Error(response.status === 404 ? 'This location or event could not be found.' : 'Unable to load data. Please try again.')
    return response.json()
}
