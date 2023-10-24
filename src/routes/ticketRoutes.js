import express from 'express'
import { ticketStateRoute } from './ticketStateRoute'

export const ticketRoute = express.Router()

ticketRoute.use('/state', ticketStateRoute)
