import express from 'express'
import { ticketStateRoute } from './ticketStateRoute.js'

export const ticketRoute = express.Router()

ticketRoute.use('/state', ticketStateRoute)
