import express from 'express'
import { getAllLocations, getLocation, getLocationEvents } from '../controllers/locations.js'

const router = express.Router()
router.get('/', getAllLocations)
router.get('/:slug/events', getLocationEvents)
router.get('/:slug', getLocation)
export default router
